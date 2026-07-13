import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";

const vault = resolve(process.argv[2] || "..");
const output = resolve(process.argv[3] || "generated/vault.sql");
const db = resolve(vault, ".memex/memex.db");
const manifestPath = resolve(dirname(new URL(import.meta.url).pathname), "../publish.manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

function query(sql) {
  const raw = execFileSync("sqlite3", ["-json", db, sql], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024
  });
  return raw.trim() ? JSON.parse(raw) : [];
}

function sqlString(value) {
  if (value === null || value === undefined) return "NULL";
  return `'${String(value).replaceAll("\0", "").replaceAll("'", "''")}'`;
}

function parseJSON(value, fallback = {}) {
  try { return JSON.parse(value || ""); } catch { return fallback; }
}

function readBody(bodyPath) {
  if (!bodyPath) return "";
  const path = resolve(vault, bodyPath);
  const rel = relative(vault, path);
  if (rel.startsWith(`..${sep}`) || rel === "..") throw new Error(`body path escapes vault: ${bodyPath}`);
  try { return readFileSync(path, "utf8"); } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

const types = query("SELECT id, name, description FROM types ORDER BY id");
const allFields = query(`
  SELECT id, type_id, name, kind, required, unique_value, enum_json, target_type, position, description
  FROM fields ORDER BY type_id, position, name
`).map((field) => ({
  ...field,
  required: Boolean(field.required),
  unique: Boolean(field.unique_value),
  enum_values: parseJSON(field.enum_json, null)
}));
const allObjects = query(`
  SELECT o.id, o.type_id, o.title, o.body_path, o.created_at, o.updated_at,
    COALESCE((
      SELECT json_group_object(f.name, json(fv.value_json))
      FROM field_values fv JOIN fields f ON f.id = fv.field_id
      WHERE fv.object_id = o.id
    ), '{}') AS fields_json
  FROM objects o ORDER BY o.id
`).map((object) => ({ ...object, fields: parseJSON(object.fields_json) }));
const allLinks = query(`
  SELECT id, from_object_id, to_object_id, kind, relation, line, text, resolved
  FROM links WHERE resolved = 1 ORDER BY id
`);
const objectByID = new Map(allObjects.map((object) => [object.id, object]));
const fieldLinks = allLinks.filter((link) => link.kind === "field");
const selected = new Set();

function value(object, name) { return object?.fields?.[name]; }
function includes(policy, key, actual) { return (policy[key] || []).includes(actual); }
function select(id) {
  const object = objectByID.get(id);
  if (!object) throw new Error(`publish manifest references missing object: ${id}`);
  selected.add(id);
  return object;
}
function isSelectedCompany(id) { return selected.has(id) && objectByID.get(id)?.type_id === "company"; }
function passesSource(object) {
  return object?.type_id === "source.item"
    && includes(manifest.source_policy, "quality", value(object, "quality"))
    && includes(manifest.source_policy, "evidence_level", value(object, "evidence_level"))
    && includes(manifest.source_policy, "processing_status", value(object, "processing_status"));
}
function passesInvestment(object) {
  const evidence = value(object, "evidence_items");
  return object?.type_id === "investment"
    && includes(manifest.investment_policy, "confidence", value(object, "confidence"))
    && (!manifest.investment_policy.require_evidence || (Array.isArray(evidence) && evidence.length > 0));
}
function passesTouchpoint(object) {
  return object?.type_id === "touchpoint"
    && includes(manifest.touchpoint_policy, "platform", value(object, "platform"))
    && includes(manifest.touchpoint_policy, "status", value(object, "status"))
    && /^https?:\/\//.test(String(value(object, "url") || ""));
}
function passesTraffic(object) {
  return object?.type_id === "traffic.snapshot" && ["full", "partial"].includes(String(value(object, "quality") || ""));
}
function passesConcept(object) {
  return object?.type_id === "concept" && includes(manifest.concept_policy, "status", value(object, "status"));
}

for (const id of manifest.companies) {
  const company = select(id);
  if (company.type_id !== "company") throw new Error(`publish seed is not a company: ${id}`);
  if (!readBody(company.body_path).trim()) throw new Error(`published company has no body: ${id}`);
}

// Select only reviewed, typed relations directly attached to an allowlisted company.
for (const link of fieldLinks) {
  const from = objectByID.get(link.from_object_id);
  const to = objectByID.get(link.to_object_id);
  if (!from || !to) continue;

  if (isSelectedCompany(from.id) && from.type_id === "company" && link.relation === "founders" && to.type_id === "person") select(to.id);
  if (!isSelectedCompany(to.id)) continue;

  if (from.type_id === "person" && link.relation === "founded_companies") select(from.id);
  if (from.type_id === "investment" && link.relation === "company" && passesInvestment(from)) select(from.id);
  if (from.type_id === "source.item" && link.relation === "about_company" && passesSource(from)) select(from.id);
  if (from.type_id === "traffic.snapshot" && link.relation === "company" && passesTraffic(from)) select(from.id);
  if (from.type_id === "touchpoint" && link.relation === "owner_company" && passesTouchpoint(from)) select(from.id);
  if (from.type_id === "concept" && link.relation === "related_companies" && passesConcept(from)) select(from.id);
}

// Complete investment evidence and investor endpoints without expanding into their other portfolio nodes.
for (const link of fieldLinks) {
  const from = objectByID.get(link.from_object_id);
  const to = objectByID.get(link.to_object_id);
  if (!from || !to || !selected.has(from.id)) continue;
  if (from.type_id === "investment" && link.relation === "investor" && to.type_id === "investor") select(to.id);
  if (from.type_id === "investment" && link.relation === "evidence_items" && passesSource(to)) select(to.id);
}

const allowedRelations = new Set([
  "company:founders:person",
  "person:founded_companies:company",
  "investment:company:company",
  "investment:investor:investor",
  "investment:evidence_items:source.item",
  "source.item:about_company:company",
  "source.item:about_person:person",
  "source.item:about_investor:investor",
  "traffic.snapshot:company:company",
  "traffic.snapshot:source_item:source.item",
  "touchpoint:owner_company:company",
  "touchpoint:owner_person:person",
  "touchpoint:owner_investor:investor",
  "concept:related_companies:company",
  "concept:evidence_items:source.item"
]);

const links = fieldLinks.filter((link) => {
  if (!selected.has(link.from_object_id) || !selected.has(link.to_object_id)) return false;
  const fromType = objectByID.get(link.from_object_id).type_id;
  const toType = objectByID.get(link.to_object_id).type_id;
  return allowedRelations.has(`${fromType}:${link.relation}:${toType}`);
});

function publicFields(object) {
  const allowed = new Set(manifest.field_allowlist[object.type_id] || []);
  return Object.fromEntries(Object.entries(object.fields).flatMap(([key, raw]) => {
    if (!allowed.has(key)) return [];
    if (Array.isArray(raw)) {
      const filtered = raw.filter((item) => !objectByID.has(String(item)) || selected.has(String(item)));
      return filtered.length ? [[key, filtered]] : [];
    }
    if (objectByID.has(String(raw)) && !selected.has(String(raw))) return [];
    return [[key, raw]];
  }));
}

const assetByPath = new Map();
function normalizeAsset(src) {
  const clean = src.split("#")[0].split("?")[0].replace(/^\.\.\//, "").replace(/^\.\//, "").replace(/^\//, "");
  return clean.startsWith("assets/") ? clean : "";
}
function sanitizeCompanyBody(object) {
  let body = readBody(object.body_path);
  for (const pattern of manifest.sensitive_body_patterns) {
    if (body.toLowerCase().includes(pattern.toLowerCase())) throw new Error(`sensitive pattern ${JSON.stringify(pattern)} in ${object.id}`);
  }
  body = body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, id, label) => {
    if (selected.has(id)) return `[[${id}${label ? `|${label}` : ""}]]`;
    return label || objectByID.get(id)?.title || id;
  });
  body = body.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_match, alt, src) => {
    const asset = normalizeAsset(src);
    const denied = !asset
      || !manifest.asset_allowlist.includes(asset)
      || manifest.asset_deny_patterns.some((pattern) => asset.toLowerCase().includes(pattern.toLowerCase()));
    if (denied) return alt ? `_${alt}（图片未收入公开版）_` : "";
    const localPath = resolve(vault, asset);
    if (!existsSync(localPath)) throw new Error(`missing public asset ${asset} referenced by ${object.id}`);
    assetByPath.set(asset, { path: asset, object_id: object.id, content_type: contentType(asset) });
    return `![${alt}](${src})`;
  });
  return body.replace(/<img\b[^>]*>/gi, "");
}
function contentType(path) {
  return ({ ".avif": "image/avif", ".gif": "image/gif", ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp" })[extname(path).toLowerCase()] || "application/octet-stream";
}
function publicBody(object, fields) {
  if (object.type_id === "company") return sanitizeCompanyBody(object);
  if (object.type_id === "source.item") {
    const url = fields.url ? `[Open original source](${fields.url})` : "Original URL unavailable.";
    return `# ${object.title}\n\n${url}\n\n| Evidence | Value |\n| --- | --- |\n| Level | ${fields.evidence_level || "unknown"} |\n| Quality | ${fields.quality || "unknown"} |\n| Processing | ${fields.processing_status || "unknown"} |\n\nThis page publishes source metadata and the research evidence boundary, not a copy of the original work.\n`;
  }
  if (object.type_id === "traffic.snapshot") return `# ${object.title}\n\n> Third-party traffic estimate. This is not revenue, user count, or API usage. Interpret it as a directional signal for the stated time window and source.\n`;
  if (object.type_id === "concept" && fields.summary) return `# ${object.title}\n\n${fields.summary}\n`;
  return "";
}

const objects = [...selected].map((id) => objectByID.get(id)).sort((a, b) => a.id.localeCompare(b.id));
const publishedTypes = new Set(objects.map((object) => object.type_id));
const typeOrder = ["company", "investor", "investment", "person", "concept", "source.item", "touchpoint", "traffic.snapshot"];
const typeDefinitions = types
  .filter((type) => publishedTypes.has(type.id))
  .sort((a, b) => typeOrder.indexOf(a.id) - typeOrder.indexOf(b.id))
  .map((type) => ({
    ...type,
    fields: allFields
      .filter((field) => field.type_id === type.id)
      .filter((field) => (manifest.field_allowlist[type.id] || []).includes(field.name))
      .filter((field) => !field.target_type || publishedTypes.has(field.target_type))
      .map(({ enum_json: _enumJSON, unique_value: _uniqueValue, ...field }) => ({
        ...field,
        enum_values: Array.isArray(field.enum_values) ? field.enum_values : undefined,
        target_type: field.target_type || undefined
      }))
  }));

function publicGraphViews() {
  const source = JSON.parse(readFileSync(resolve(vault, "memex.graph-views.json"), "utf8"));
  const views = (source.views || []).flatMap((view) => {
    if (!publishedTypes.has(view.root_type)) return [];
    const paths = (view.paths || []).filter((path) => {
      let currentType = view.root_type;
      for (const step of path.steps || []) {
        const targetType = step.target_type;
        if (!publishedTypes.has(targetType)) return false;
        const relationKey = step.direction === "out"
          ? `${currentType}:${step.relation}:${targetType}`
          : `${targetType}:${step.relation}:${currentType}`;
        if (!allowedRelations.has(relationKey)) return false;
        currentType = targetType;
      }
      return (path.steps || []).length > 0;
    });
    if (paths.length === 0) return [];
    const visibleTypes = new Set([view.root_type]);
    for (const path of paths) for (const step of path.steps || []) visibleTypes.add(step.target_type);
    const nodes = Object.fromEntries(Object.entries(view.nodes || {}).flatMap(([type, template]) => {
      if (!visibleTypes.has(type)) return [];
      const allowed = new Set(["id", "title", ...(manifest.field_allowlist[type] || [])]);
      return [[type, {
        ...template,
        title_field: allowed.has(template.title_field) ? template.title_field : "title",
        subtitle_field: allowed.has(template.subtitle_field) ? template.subtitle_field : undefined,
        meta_fields: (template.meta_fields || []).filter((field) => allowed.has(field)),
        badge_fields: (template.badge_fields || []).filter((field) => allowed.has(field)),
        image_field: allowed.has(template.image_field) ? template.image_field : undefined
      }]];
    }));
    const bridges = Object.fromEntries(Object.entries(view.bridges || {}).filter(([type]) => visibleTypes.has(type)).map(([type, bridge]) => [type, {
      ...bridge,
      label_fields: (bridge.label_fields || []).filter((field) => (manifest.field_allowlist[type] || []).includes(field))
    }]));
    return [{ ...view, ...(manifest.graph_view_overrides?.[view.id] || {}), paths, nodes, bridges }];
  });
  return { version: source.version || 2, views };
}

const graphViews = publicGraphViews();
const fieldsByID = new Map(objects.map((object) => [object.id, publicFields(object)]));
const bodiesByID = new Map(objects.map((object) => [object.id, publicBody(object, fieldsByID.get(object.id))]));
const publicAssets = [...assetByPath.values()].sort((a, b) => a.path.localeCompare(b.path));

if (objects.some((object) => ["note", "method"].includes(object.type_id))) throw new Error("internal note/method entered public projection");
if (links.some((link) => link.kind !== "field")) throw new Error("non-field link entered public projection");

const lines = [
  "-- Generated from publish.manifest.json. Do not edit.",
  "DELETE FROM public_assets;",
  "DELETE FROM object_search;",
  "DELETE FROM links;",
  "DELETE FROM objects;",
  "DELETE FROM types;",
  "DELETE FROM metadata;"
];

for (const type of types.filter((type) => publishedTypes.has(type.id))) {
  lines.push(`INSERT INTO types (id,name,description) VALUES (${sqlString(type.id)},${sqlString(type.name)},${sqlString(type.description)});`);
}
for (const object of objects) {
  const fieldsJSON = JSON.stringify(fieldsByID.get(object.id));
  const body = bodiesByID.get(object.id);
  const bodyPath = object.type_id === "company" ? object.body_path : "";
  lines.push(`INSERT INTO objects (id,type_id,title,body,body_path,fields_json,created_at,updated_at) VALUES (${sqlString(object.id)},${sqlString(object.type_id)},${sqlString(object.title)},${sqlString(body)},${sqlString(bodyPath)},${sqlString(fieldsJSON)},${sqlString(object.created_at)},${sqlString(object.updated_at)});`);
  lines.push(`INSERT INTO object_search (id,title,body,fields) VALUES (${sqlString(object.id)},${sqlString(object.title)},${sqlString(body)},${sqlString(fieldsJSON)});`);
}
for (const link of links) {
  lines.push(`INSERT INTO links (id,from_object_id,to_object_id,kind,relation,line,text,resolved) VALUES (${Number(link.id)},${sqlString(link.from_object_id)},${sqlString(link.to_object_id)},'field',${sqlString(link.relation)},0,'',1);`);
}
for (const asset of publicAssets) {
  lines.push(`INSERT INTO public_assets (path,object_id,content_type) VALUES (${sqlString(asset.path)},${sqlString(asset.object_id)},${sqlString(asset.content_type)});`);
}

const generatedAt = new Date().toISOString();
lines.push(`INSERT INTO metadata (key,value) VALUES ('generated_at',${sqlString(generatedAt)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('publication_manifest_version',${sqlString(manifest.version)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('company_count',${sqlString(manifest.companies.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('object_count',${sqlString(objects.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('link_count',${sqlString(links.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('asset_count',${sqlString(publicAssets.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('type_definitions',${sqlString(JSON.stringify(typeDefinitions))});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('graph_views',${sqlString(JSON.stringify(graphViews))});`);

const report = {
  manifest_version: manifest.version,
  companies: manifest.companies,
  counts: {
    objects: objects.length,
    links: links.length,
    assets: publicAssets.length,
    by_type: Object.fromEntries([...publishedTypes].sort().map((type) => [type, objects.filter((object) => object.type_id === type).length]))
  }
};

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n")}\n`);
writeFileSync(resolve(dirname(output), "public-assets.json"), `${JSON.stringify(publicAssets, null, 2)}\n`);
writeFileSync(resolve(dirname(output), "publication-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Published ${manifest.companies.length} companies, ${objects.length} objects, ${links.length} field links, and ${publicAssets.length} assets`);
