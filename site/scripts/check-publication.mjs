import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const db = resolve("generated/publication-check.db");
const vault = resolve(process.env.MEMEX_VAULT || "..");
const sourceDB = resolve(vault, ".memex/memex.db");
const manifest = JSON.parse(readFileSync(resolve("publish.manifest.json"), "utf8"));
const seoConfig = JSON.parse(readFileSync(resolve("seo.config.json"), "utf8"));
const assets = JSON.parse(readFileSync(resolve("generated/public-assets.json"), "utf8"));
const indexNowManifest = JSON.parse(readFileSync(resolve("generated/indexnow-manifest.json"), "utf8"));
let migrations = readdirSync(resolve("migrations"))
  .filter((name) => name.endsWith(".sql"))
  .sort()
  .map((name) => readFileSync(resolve("migrations", name), "utf8"));

try {
  execFileSync("sqlite3", [":memory:", "CREATE VIRTUAL TABLE fts5_check USING fts5(value)"], { stdio: "ignore" });
} catch {
  migrations = migrations.map((sql) => sql.replace(
    /CREATE VIRTUAL TABLE IF NOT EXISTS object_search USING fts5\([\s\S]*?\);/,
    "CREATE TABLE IF NOT EXISTS object_search (id TEXT, title TEXT, body TEXT, fields TEXT);"
  ));
}
const sql = [...migrations, readFileSync(resolve("generated/vault.sql"), "utf8")].join("\n");

rmSync(db, { force: true });
execFileSync("sqlite3", [db], { input: sql, stdio: ["pipe", "pipe", "inherit"], maxBuffer: 128 * 1024 * 1024 });

function scalar(target, statement) {
  return String(execFileSync("sqlite3", [target, statement], { encoding: "utf8" })).trim();
}
function rows(target, statement) {
  const raw = execFileSync("sqlite3", ["-json", target, statement], { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
  return raw.trim() ? JSON.parse(raw) : [];
}
function assert(condition, message) {
  if (!condition) throw new Error(`publication check failed: ${message}`);
}

assert(manifest.mode === "full-vault", "publication mode is not full-vault");

const sourceCounts = {
  types: Number(scalar(sourceDB, "SELECT COUNT(*) FROM types")),
  fields: Number(scalar(sourceDB, "SELECT COUNT(*) FROM fields")),
  objects: Number(scalar(sourceDB, "SELECT COUNT(*) FROM objects")),
  links: Number(scalar(sourceDB, "SELECT COUNT(*) FROM links WHERE resolved=1")),
  companies: Number(scalar(sourceDB, "SELECT COUNT(*) FROM objects WHERE type_id='company'"))
};
const publishedCounts = {
  types: Number(scalar(db, "SELECT COUNT(*) FROM types")),
  objects: Number(scalar(db, "SELECT COUNT(*) FROM objects")),
  links: Number(scalar(db, "SELECT COUNT(*) FROM links")),
  companies: Number(scalar(db, "SELECT COUNT(*) FROM objects WHERE type_id='company'"))
};

assert(publishedCounts.types === sourceCounts.types, "type count differs from source vault");
assert(publishedCounts.objects === sourceCounts.objects, "object count differs from source vault");
assert(publishedCounts.links === sourceCounts.links, "resolved link count differs from source vault");
assert(publishedCounts.companies === sourceCounts.companies, "company count differs from source vault");
assert(Number(scalar(db, "SELECT COUNT(*) FROM object_search")) === sourceCounts.objects, "search index is incomplete");
assert(Number(scalar(db, "SELECT COUNT(*) FROM public_assets")) === assets.length, "asset projection count differs from generated manifest");
assert(indexNowManifest.version === 1, "IndexNow manifest version is invalid");
assert(indexNowManifest.entries.length > 0, "IndexNow manifest is empty");
assert(new Set(indexNowManifest.entries.map((entry) => entry.url)).size === indexNowManifest.entries.length, "IndexNow manifest contains duplicate URLs");
assert(indexNowManifest.entries.every((entry) => /^https:\/\/companies\.yan5xu\.ai\//.test(entry.url) && /^[a-f0-9]{64}$/.test(entry.fingerprint)), "IndexNow manifest contains an invalid entry");

const sourceObjects = rows(sourceDB, "SELECT id,body_path FROM objects ORDER BY id");
const publishedObjects = rows(db, "SELECT id,body,body_html,fields_json FROM objects ORDER BY id");
const publishedByID = new Map(publishedObjects.map((object) => [object.id, object]));
const publicIDs = new Set(publishedObjects.map((object) => object.id));

for (const object of sourceObjects) {
  const published = publishedByID.get(object.id);
  assert(published, `missing object ${object.id}`);
  const expectedBody = object.body_path ? readFileSync(resolve(vault, object.body_path), "utf8") : "";
  assert(published.body === expectedBody, `${object.id} body differs from source Markdown`);
  assert(!/<script\b/i.test(published.body_html), `${object.id} SEO HTML contains a script tag`);
  if (expectedBody.trim()) assert(published.body_html.trim(), `${object.id} SEO HTML is empty`);
}

for (const object of publishedObjects) {
  const content = `${object.body}\n${object.fields_json}`.toLowerCase();
  for (const pattern of manifest.sensitive_patterns || []) {
    assert(!content.includes(String(pattern).toLowerCase()), `${object.id} contains sensitive pattern ${JSON.stringify(pattern)}`);
  }
  for (const match of object.body.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
    assert(publicIDs.has(match[1]), `${object.id} links to missing object ${match[1]}`);
  }
}

for (const asset of assets) {
  assert(existsSync(resolve(vault, asset.path)), `referenced asset is missing: ${asset.path}`);
  assert(publicIDs.has(asset.object_id), `asset owner is missing: ${asset.path}`);
}

const typeDefinitions = JSON.parse(scalar(db, "SELECT value FROM metadata WHERE key='type_definitions'"));
assert(typeDefinitions.length === sourceCounts.types, "type definitions are incomplete");
assert(typeDefinitions.reduce((count, type) => count + (type.fields || []).length, 0) === sourceCounts.fields, "field definitions are incomplete");

const publicTypes = new Set(typeDefinitions.map((type) => type.id));
const graphViews = JSON.parse(scalar(db, "SELECT value FROM metadata WHERE key='graph_views'"));
for (const view of graphViews.views || []) {
  assert(publicTypes.has(view.root_type), `graph view ${view.id} has missing root type ${view.root_type}`);
  for (const path of view.paths || []) {
    for (const step of path.steps || []) assert(publicTypes.has(step.target_type), `graph view ${view.id} targets missing type ${step.target_type}`);
  }
  for (const type of Object.keys(view.nodes || {})) assert(publicTypes.has(type), `graph view ${view.id} renders missing type ${type}`);
  for (const type of Object.keys(view.bridges || {})) assert(publicTypes.has(type), `graph view ${view.id} folds missing type ${type}`);
}

assert(scalar(db, "SELECT value FROM metadata WHERE key='publication_mode'") === "full-vault", "publication metadata mode is wrong");
assert(Number(scalar(db, "SELECT value FROM metadata WHERE key='object_count'")) === sourceCounts.objects, "object metadata count is wrong");
assert(Number(scalar(db, "SELECT value FROM metadata WHERE key='link_count'")) === sourceCounts.links, "link metadata count is wrong");
const seoIndexableCount = Number(scalar(db, "SELECT value FROM metadata WHERE key='seo_indexable_count'"));
assert(seoIndexableCount > 0 && seoIndexableCount <= sourceCounts.objects, "SEO indexable count is invalid");
assert(indexNowManifest.entries.length === seoIndexableCount + 1 + seoConfig.indexing.collection_types.length, "IndexNow manifest does not match indexable objects and collection pages");

rmSync(db, { force: true });
console.log(`Publication check passed: full vault with ${sourceCounts.types} types, ${sourceCounts.objects} objects, ${sourceCounts.links} links, and ${assets.length} assets`);
