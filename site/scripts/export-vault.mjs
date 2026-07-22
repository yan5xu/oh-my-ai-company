import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import sharp from "sharp";
import { matchesSensitivePattern } from "./publication-safety.mjs";

const vault = resolve(process.argv[2] || "..");
const output = resolve(process.argv[3] || "generated/vault.sql");
const db = resolve(vault, ".memex/memex.db");
const manifestPath = resolve(dirname(new URL(import.meta.url).pathname), "../publish.manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const seoConfigPath = resolve(dirname(new URL(import.meta.url).pathname), "../seo.config.json");
const seoConfig = JSON.parse(readFileSync(seoConfigPath, "utf8"));
const topicsPath = resolve(dirname(new URL(import.meta.url).pathname), "../src/topics/topics.json");
const topics = JSON.parse(readFileSync(topicsPath, "utf8"));

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

const MAX_SQL_STATEMENT_BYTES = 32 * 1024;
const SQL_TEXT_CHUNK_BYTES = 4 * 1024;

function chunkText(value, maxBytes = SQL_TEXT_CHUNK_BYTES) {
  const chunks = [];
  let chunk = "";
  let bytes = 0;
  for (const character of String(value || "")) {
    const characterBytes = Buffer.byteLength(character);
    if (chunk && bytes + characterBytes > maxBytes) {
      chunks.push(chunk);
      chunk = "";
      bytes = 0;
    }
    chunk += character;
    bytes += characterBytes;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

function pushTextUpdates(lines, table, column, keyColumn, key, value) {
  for (const chunk of chunkText(value)) {
    const statement = `UPDATE ${table} SET ${column} = ${column} || ${sqlString(chunk)} WHERE ${keyColumn} = ${sqlString(key)};`;
    if (Buffer.byteLength(statement) > MAX_SQL_STATEMENT_BYTES) {
      throw new Error(`generated SQL chunk exceeds statement budget for ${table}.${column}`);
    }
    lines.push(statement);
  }
}

function pushMetadata(lines, key, value) {
  const statement = `INSERT INTO metadata (key,value) VALUES (${sqlString(key)},${sqlString(value)});`;
  if (Buffer.byteLength(statement) <= MAX_SQL_STATEMENT_BYTES) {
    lines.push(statement);
    return;
  }
  lines.push(`INSERT INTO metadata (key,value) VALUES (${sqlString(key)},'');`);
  pushTextUpdates(lines, "metadata", "value", "key", key, value);
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
    if (matchesSensitivePattern(text, pattern)) {
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
  assetByPath.set(asset, { path: asset, object_id: object.id, content_type: contentType(asset), local_path: localPath });
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
const publicAssets = await Promise.all([...assetByPath.values()].map(async ({ local_path, ...asset }) => {
  const bytes = readFileSync(local_path);
  const integrity = {
    size: bytes.byteLength,
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
  if (!asset.content_type.startsWith("image/")) return { ...asset, ...integrity, width: null, height: null };
  const metadata = await sharp(bytes).metadata();
  return {
    ...asset,
    ...integrity,
    width: Number.isFinite(metadata.width) ? metadata.width : null,
    height: Number.isFinite(metadata.height) ? metadata.height : null
  };
}));
publicAssets.sort((a, b) => a.path.localeCompare(b.path));
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

function topicReferencedIDs(topic) {
  const ids = new Set();
  if (topic.format === "comparison") {
    for (const company of topic.companies) ids.add(company.id);
    for (const reference of topic.boundaryReferences) ids.add(reference.id);
    for (const id of topic.conceptIDs) ids.add(id);
    ids.add(topic.methodID);
    for (const id of topic.featuredObjectIDs) ids.add(id);
    for (const company of topic.companies) {
      for (const cell of Object.values(company.dimensions)) {
        for (const evidenceID of cell.evidenceIDs) ids.add(evidenceID);
      }
    }
  } else if (topic.format === "essay") {
    for (const id of [...topic.coveredCompanyIDs, ...topic.featuredObjectIDs]) ids.add(id);
    for (const reference of topic.bridgeReferences) ids.add(reference.id);
    for (const chapter of topic.chapters) {
      for (const block of chapter.blocks) {
        if (block.type === "prose" || block.type === "evidence-callout") {
          for (const id of block.objectIDs || []) ids.add(id);
          for (const id of block.evidenceIDs || []) ids.add(id);
        } else if (block.type === "anchor-comparison") {
          for (const anchor of block.anchors) {
            ids.add(anchor.id);
            for (const id of anchor.evidenceIDs) ids.add(id);
          }
        } else if (block.type === "supporting-cases") {
          for (const item of block.cases) ids.add(item.id);
        }
      }
    }
  } else {
    throw new Error(`topic ${topic.id} has unknown format ${topic.format}`);
  }
  return [...ids].sort();
}

function expectedTopicType(_topic, id) {
  if (id.startsWith("company.")) return "company";
  if (id.startsWith("concept.")) return "concept";
  if (id.startsWith("method.")) return "method";
  if (id.startsWith("source.")) return "source.item";
  return null;
}

const topicResolutions = topics.map((topic) => {
  if (!topic.id || topic.id !== topic.slug || !/^\d{4}-\d{2}-\d{2}$/.test(topic.updatedAt)) {
    throw new Error(`invalid topic definition: ${topic.id || "missing id"}`);
  }
  const resolved = topicReferencedIDs(topic).map((id) => {
    const object = objectByID.get(id);
    if (!object) throw new Error(`topic ${topic.id} references missing object ${id}`);
    const expected = expectedTopicType(topic, id);
    if (expected && object.type_id !== expected) throw new Error(`topic ${topic.id} expects ${id} to be ${expected}, got ${object.type_id}`);
    return {
      id,
      type: object.type_id,
      title: object.title,
      canonical: publicObjectPath(object),
      updated_at: object.updated_at,
      indexable: isSEOIndexable(object)
    };
  });
  return { definition: topic, resolved };
});

const topicIDs = new Set(topics.map((topic) => topic.id));
for (const topic of topics) {
  if (topic.format === "essay") {
    for (const childID of topic.childTopicIDs) {
      if (!topicIDs.has(childID)) throw new Error(`topic ${topic.id} references missing child topic ${childID}`);
    }
  }
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
const topicIndexNowEntries = topicResolutions.map(({ definition, resolved }) => ({
  url: absolutePublicURL(`/topics/${encodeURIComponent(definition.slug)}`),
  fingerprint: digest({ definition, resolved }),
  type: "topic",
  topic_id: definition.id
}));
const pageIndexNowEntries = [
  {
    url: absolutePublicURL("/"),
    fingerprint: digest({
      seo_config_version: seoConfig.version,
      objects: objectIndexNowEntries.map((entry) => [entry.url, entry.fingerprint]),
      topics: topicIndexNowEntries.map((entry) => [entry.url, entry.fingerprint])
    }),
    type: "page"
  },
  {
    url: absolutePublicURL("/topics"),
    fingerprint: digest({
      seo_config_version: seoConfig.version,
      topics: topicIndexNowEntries.map((entry) => [entry.url, entry.fingerprint])
    }),
    type: "collection"
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
  entries: [...pageIndexNowEntries, ...topicIndexNowEntries, ...objectIndexNowEntries].sort((a, b) => a.url.localeCompare(b.url))
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
  const objectStatement = `INSERT INTO objects (id,type_id,title,body,body_html,body_path,fields_json,created_at,updated_at) VALUES (${sqlString(object.id)},${sqlString(object.type_id)},${sqlString(object.title)},${sqlString(body)},${sqlString(bodyHTML)},${sqlString(object.body_path)},${sqlString(fieldsJSON)},${sqlString(object.created_at)},${sqlString(object.updated_at)});`;
  if (Buffer.byteLength(objectStatement) <= MAX_SQL_STATEMENT_BYTES) {
    lines.push(objectStatement);
  } else {
    lines.push(`INSERT INTO objects (id,type_id,title,body,body_html,body_path,fields_json,created_at,updated_at) VALUES (${sqlString(object.id)},${sqlString(object.type_id)},${sqlString(object.title)},'','',${sqlString(object.body_path)},${sqlString(fieldsJSON)},${sqlString(object.created_at)},${sqlString(object.updated_at)});`);
    pushTextUpdates(lines, "objects", "body", "id", object.id, body);
    pushTextUpdates(lines, "objects", "body_html", "id", object.id, bodyHTML);
  }
  const searchStatement = `INSERT INTO object_search (id,title,body,fields) VALUES (${sqlString(object.id)},${sqlString(object.title)},${sqlString(body)},${sqlString(fieldsJSON)});`;
  if (Buffer.byteLength(searchStatement) <= MAX_SQL_STATEMENT_BYTES) {
    lines.push(searchStatement);
  } else {
    lines.push(`INSERT INTO object_search (id,title,body,fields) VALUES (${sqlString(object.id)},${sqlString(object.title)},'',${sqlString(fieldsJSON)});`);
    pushTextUpdates(lines, "object_search", "body", "id", object.id, body);
  }
}
for (const link of links) {
  lines.push(`INSERT INTO links (id,from_object_id,to_object_id,kind,relation,line,text,resolved) VALUES (${Number(link.id)},${sqlString(link.from_object_id)},${sqlString(link.to_object_id)},${sqlString(link.kind)},${sqlString(link.relation)},${Number(link.line || 0)},${sqlString(link.text || "")},1);`);
}
for (const asset of publicAssets) {
  lines.push(`INSERT INTO public_assets (path,object_id,content_type,width,height) VALUES (${sqlString(asset.path)},${sqlString(asset.object_id)},${sqlString(asset.content_type)},${asset.width ?? "NULL"},${asset.height ?? "NULL"});`);
}

const generatedAt = new Date().toISOString();
pushMetadata(lines, "generated_at", generatedAt);
pushMetadata(lines, "publication_manifest_version", manifest.version);
pushMetadata(lines, "publication_mode", manifest.mode);
pushMetadata(lines, "company_count", companyCount);
pushMetadata(lines, "object_count", objects.length);
pushMetadata(lines, "link_count", links.length);
pushMetadata(lines, "asset_count", publicAssets.length);
pushMetadata(lines, "seo_config_version", seoConfig.version);
pushMetadata(lines, "seo_indexable_count", seoIndexableCount);
pushMetadata(lines, "topic_count", topics.length);
pushMetadata(lines, "type_definitions", JSON.stringify(typeDefinitions));
pushMetadata(lines, "graph_views", JSON.stringify(graphViews));

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
