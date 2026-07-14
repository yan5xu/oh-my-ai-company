import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const vault = resolve(process.argv[2] || "..");
const output = resolve(process.argv[3] || "generated/vault.sql");
const db = resolve(vault, ".memex/memex.db");
const manifestPath = resolve(dirname(new URL(import.meta.url).pathname), "../publish.manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const seoConfigPath = resolve(dirname(new URL(import.meta.url).pathname), "../seo.config.json");
const seoConfig = JSON.parse(readFileSync(seoConfigPath, "utf8"));

if (manifest.mode !== "full-vault") throw new Error(`unsupported publication mode: ${manifest.mode}`);

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

function assertPublicText(value, context) {
  const text = String(value || "");
  for (const pattern of manifest.sensitive_patterns || []) {
    if (text.toLowerCase().includes(String(pattern).toLowerCase())) {
      throw new Error(`sensitive pattern ${JSON.stringify(pattern)} in ${context}`);
    }
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
const objects = query(`
  SELECT o.id, o.type_id, o.title, o.body_path, o.created_at, o.updated_at,
    COALESCE((
      SELECT json_group_object(f.name, json(fv.value_json))
      FROM field_values fv JOIN fields f ON f.id = fv.field_id
      WHERE fv.object_id = o.id
    ), '{}') AS fields_json
  FROM objects o ORDER BY o.id
`).map((object) => ({ ...object, fields: parseJSON(object.fields_json) }));
const links = query(`
  SELECT id, from_object_id, to_object_id, kind, relation, line, text, resolved
  FROM links WHERE resolved = 1 ORDER BY id
`);
const objectIDs = new Set(objects.map((object) => object.id));

for (const link of links) {
  if (!objectIDs.has(link.from_object_id) || !objectIDs.has(link.to_object_id)) {
    throw new Error(`resolved link ${link.id} references a missing object`);
  }
}

const typeDefinitions = types.map((type) => ({
  ...type,
  fields: allFields
    .filter((field) => field.type_id === type.id)
    .map(({ enum_json: _enumJSON, unique_value: _uniqueValue, ...field }) => ({
      ...field,
      enum_values: Array.isArray(field.enum_values) ? field.enum_values : undefined,
      target_type: field.target_type || undefined
    }))
}));

const graphViews = JSON.parse(readFileSync(resolve(vault, "memex.graph-views.json"), "utf8"));
const assetByPath = new Map();

function contentType(path) {
  return ({
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
  })[extname(path).toLowerCase()] || "application/octet-stream";
}

function normalizeAsset(src) {
  const value = String(src || "").trim();
  if (!value || /^(?:https?:|data:|blob:)/i.test(value)) return "";
  const clean = value.split("#")[0].split("?")[0]
    .replace(/^\.\.\//, "")
    .replace(/^\.\//, "")
    .replace(/^\//, "");
  return clean.startsWith("assets/") ? clean : "";
}

function publicObjectPath(object) {
  const route = seoConfig.routes[object.type_id];
  if (!route) return `/objects/${encodeURIComponent(object.id)}`;
  const prefix = `${route.id_prefix}.`;
  const slug = object.id.startsWith(prefix) ? object.id.slice(prefix.length) : object.id;
  return `/${route.collection}/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

function markdownLinkText(value) {
  return String(value || "").replaceAll("\\", "\\\\").replaceAll("[", "\\[").replaceAll("]", "\\]");
}

function rewriteWikilinks(body, objectByID) {
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, rawID, rawLabel) => {
    const id = String(rawID).trim();
    const target = objectByID.get(id);
    const label = String(rawLabel || target?.title || id).trim();
    return target ? `[${markdownLinkText(label)}](${publicObjectPath(target)})` : markdownLinkText(label);
  });
}

function publicMediaURL(src) {
  const asset = normalizeAsset(src);
  return asset ? `/media/${asset.split("/").map(encodeURIComponent).join("/")}` : "";
}

function renderBodyHTML(body, objectByID) {
  const source = rewriteWikilinks(body, objectByID);
  const rendered = marked.parse(source, { async: false, gfm: true });
  return sanitizeHtml(String(rendered), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption", "details", "summary", "mark", "del", "sup", "sub"],
    allowedAttributes: {
      a: ["href", "title", "rel"],
      img: ["src", "alt", "title", "loading", "decoding"],
      code: ["class"],
      th: ["align"],
      td: ["align"]
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => {
        const href = attributes.href || "";
        if (!href || /^(?:javascript|data|vbscript):/i.test(href)) return { tagName: "span", attribs: {} };
        const external = /^https?:\/\//i.test(href);
        return {
          tagName: "a",
          attribs: {
            ...attributes,
            ...(external ? { rel: "external noopener noreferrer" } : {})
          }
        };
      },
      img: (_tagName, attributes) => {
        const localURL = publicMediaURL(attributes.src || "");
        const src = localURL || (/^https?:\/\//i.test(attributes.src || "") ? attributes.src : "");
        if (!src) return { tagName: "span", attribs: {} };
        return {
          tagName: "img",
          attribs: {
            src,
            alt: attributes.alt || "",
            ...(attributes.title ? { title: attributes.title } : {}),
            loading: "lazy",
            decoding: "async"
          }
        };
      }
    }
  });
}

function registerAsset(src, object) {
  const asset = normalizeAsset(src);
  if (!asset) return;
  const localPath = resolve(vault, asset);
  const rel = relative(vault, localPath);
  if (rel.startsWith(`..${sep}`) || rel === "..") throw new Error(`asset path escapes vault: ${src}`);
  if (!existsSync(localPath)) throw new Error(`missing asset ${asset} referenced by ${object.id}`);
  assetByPath.set(asset, { path: asset, object_id: object.id, content_type: contentType(asset) });
}

function publicBody(object) {
  const body = readBody(object.body_path);
  assertPublicText(body, `${object.id} body`);
  assertPublicText(JSON.stringify(object.fields), `${object.id} fields`);
  for (const match of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) registerAsset(match[1], object);
  for (const match of body.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) registerAsset(match[1], object);
  return body;
}

const fieldsByID = new Map(objects.map((object) => [object.id, object.fields]));
const objectByID = new Map(objects.map((object) => [object.id, object]));
const bodiesByID = new Map(objects.map((object) => [object.id, publicBody(object)]));
const bodyHTMLByID = new Map(objects.map((object) => [object.id, renderBodyHTML(bodiesByID.get(object.id), objectByID)]));
const publicAssets = [...assetByPath.values()].sort((a, b) => a.path.localeCompare(b.path));
const companyCount = objects.filter((object) => object.type_id === "company").length;

function isSEOIndexable(object) {
  const body = bodiesByID.get(object.id).trim();
  const minimum = Number(seoConfig.indexing.minimum_body_chars[object.type_id] || 0);
  if (body.length < minimum) return false;
  if (seoConfig.indexing.primary_types.includes(object.type_id)) return true;
  if (object.type_id !== "source.item") return false;
  const fields = object.fields || {};
  return seoConfig.indexing.source_quality.includes(String(fields.quality || ""))
    && seoConfig.indexing.source_evidence_levels.includes(String(fields.evidence_level || ""))
    && seoConfig.indexing.source_processing_status.includes(String(fields.processing_status || ""));
}

const seoIndexableObjects = objects.filter(isSEOIndexable);
const seoIndexableCount = seoIndexableObjects.length;

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function absolutePublicURL(path) {
  return new URL(path, `${seoConfig.site.base_url}/`).toString();
}

const relationsByObject = new Map(objects.map((object) => [object.id, []]));
for (const link of links) {
  const relation = {
    from: link.from_object_id,
    to: link.to_object_id,
    kind: link.kind,
    relation: link.relation,
    from_title: objectByID.get(link.from_object_id)?.title || "",
    to_title: objectByID.get(link.to_object_id)?.title || ""
  };
  relationsByObject.get(link.from_object_id)?.push(relation);
  relationsByObject.get(link.to_object_id)?.push(relation);
}

const objectFingerprints = new Map(seoIndexableObjects.map((object) => [
  object.id,
  digest({
    seo_config_version: seoConfig.version,
    id: object.id,
    type_id: object.type_id,
    title: object.title,
    body: bodiesByID.get(object.id),
    body_html: bodyHTMLByID.get(object.id),
    fields: fieldsByID.get(object.id),
    created_at: object.created_at,
    updated_at: object.updated_at,
    relations: (relationsByObject.get(object.id) || []).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
  })
]));

const objectIndexNowEntries = seoIndexableObjects.map((object) => ({
  url: absolutePublicURL(publicObjectPath(object)),
  fingerprint: objectFingerprints.get(object.id),
  type: object.type_id,
  object_id: object.id
}));
const pageIndexNowEntries = [
  {
    url: absolutePublicURL("/"),
    fingerprint: digest({
      seo_config_version: seoConfig.version,
      objects: objectIndexNowEntries.map((entry) => [entry.url, entry.fingerprint])
    }),
    type: "page"
  },
  ...seoConfig.indexing.collection_types.flatMap((type) => {
    const route = seoConfig.routes[type];
    if (!route) return [];
    return [{
      url: absolutePublicURL(`/${route.collection}`),
      fingerprint: digest({
        seo_config_version: seoConfig.version,
        type,
        objects: objectIndexNowEntries.filter((entry) => entry.type === type).map((entry) => [entry.url, entry.fingerprint])
      }),
      type: "collection"
    }];
  })
];
const indexNowManifest = {
  version: 1,
  generated_at: new Date().toISOString(),
  entries: [...pageIndexNowEntries, ...objectIndexNowEntries].sort((a, b) => a.url.localeCompare(b.url))
};

const lines = [
  "-- Generated from the complete Memex vault. Do not edit.",
  "DELETE FROM public_assets;",
  "DELETE FROM object_search;",
  "DELETE FROM links;",
  "DELETE FROM objects;",
  "DELETE FROM types;",
  "DELETE FROM metadata;"
];

for (const type of types) {
  lines.push(`INSERT INTO types (id,name,description) VALUES (${sqlString(type.id)},${sqlString(type.name)},${sqlString(type.description)});`);
}
for (const object of objects) {
  const fieldsJSON = JSON.stringify(fieldsByID.get(object.id));
  const body = bodiesByID.get(object.id);
  const bodyHTML = bodyHTMLByID.get(object.id);
  lines.push(`INSERT INTO objects (id,type_id,title,body,body_html,body_path,fields_json,created_at,updated_at) VALUES (${sqlString(object.id)},${sqlString(object.type_id)},${sqlString(object.title)},${sqlString(body)},${sqlString(bodyHTML)},${sqlString(object.body_path)},${sqlString(fieldsJSON)},${sqlString(object.created_at)},${sqlString(object.updated_at)});`);
  lines.push(`INSERT INTO object_search (id,title,body,fields) VALUES (${sqlString(object.id)},${sqlString(object.title)},${sqlString(body)},${sqlString(fieldsJSON)});`);
}
for (const link of links) {
  lines.push(`INSERT INTO links (id,from_object_id,to_object_id,kind,relation,line,text,resolved) VALUES (${Number(link.id)},${sqlString(link.from_object_id)},${sqlString(link.to_object_id)},${sqlString(link.kind)},${sqlString(link.relation)},${Number(link.line || 0)},${sqlString(link.text || "")},1);`);
}
for (const asset of publicAssets) {
  lines.push(`INSERT INTO public_assets (path,object_id,content_type) VALUES (${sqlString(asset.path)},${sqlString(asset.object_id)},${sqlString(asset.content_type)});`);
}

const generatedAt = new Date().toISOString();
lines.push(`INSERT INTO metadata (key,value) VALUES ('generated_at',${sqlString(generatedAt)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('publication_manifest_version',${sqlString(manifest.version)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('publication_mode',${sqlString(manifest.mode)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('company_count',${sqlString(companyCount)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('object_count',${sqlString(objects.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('link_count',${sqlString(links.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('asset_count',${sqlString(publicAssets.length)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('seo_config_version',${sqlString(seoConfig.version)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('seo_indexable_count',${sqlString(seoIndexableCount)});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('type_definitions',${sqlString(JSON.stringify(typeDefinitions))});`);
lines.push(`INSERT INTO metadata (key,value) VALUES ('graph_views',${sqlString(JSON.stringify(graphViews))});`);

const report = {
  manifest_version: manifest.version,
  mode: manifest.mode,
  counts: {
    types: types.length,
    objects: objects.length,
    links: links.length,
    assets: publicAssets.length,
    seo_indexable: seoIndexableCount,
    indexnow_urls: indexNowManifest.entries.length,
    seo_indexable_by_type: Object.fromEntries(types.map((type) => [type.id, seoIndexableObjects.filter((object) => object.type_id === type.id).length])),
    by_type: Object.fromEntries(types.map((type) => [type.id, objects.filter((object) => object.type_id === type.id).length]))
  }
};

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${lines.join("\n")}\n`);
writeFileSync(resolve(dirname(output), "public-assets.json"), `${JSON.stringify(publicAssets, null, 2)}\n`);
writeFileSync(resolve(dirname(output), "publication-report.json"), `${JSON.stringify(report, null, 2)}\n`);
writeFileSync(resolve(dirname(output), "indexnow-manifest.json"), `${JSON.stringify(indexNowManifest, null, 2)}\n`);
console.log(`Published full vault: ${types.length} types, ${objects.length} objects, ${links.length} links, and ${publicAssets.length} referenced assets`);
