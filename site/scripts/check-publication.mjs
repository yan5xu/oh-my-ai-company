import { execFileSync } from "node:child_process";
import { readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const db = resolve("generated/publication-check.db");
const manifest = JSON.parse(readFileSync(resolve("publish.manifest.json"), "utf8"));
const assets = JSON.parse(readFileSync(resolve("generated/public-assets.json"), "utf8"));
const sql = [
  readFileSync(resolve("migrations/0001_public_schema.sql"), "utf8"),
  readFileSync(resolve("migrations/0002_public_assets.sql"), "utf8"),
  readFileSync(resolve("generated/vault.sql"), "utf8")
].join("\n");

rmSync(db, { force: true });
execFileSync("sqlite3", [db], { input: sql, stdio: ["pipe", "pipe", "inherit"] });

function scalar(statement) {
  return String(execFileSync("sqlite3", [db, statement], { encoding: "utf8" })).trim();
}
function assert(condition, message) {
  if (!condition) throw new Error(`publication check failed: ${message}`);
}

assert(Number(scalar("SELECT COUNT(*) FROM objects WHERE type_id='company'")) === manifest.companies.length, "company count does not match manifest");
assert(Number(scalar("SELECT COUNT(*) FROM objects WHERE type_id IN ('note','method','batch')")) === 0, "internal types are present");
assert(Number(scalar("SELECT COUNT(*) FROM links WHERE kind <> 'field'")) === 0, "weak links are present");
assert(Number(scalar(`SELECT COUNT(*) FROM objects WHERE type_id='source.item' AND (
  json_extract(fields_json,'$.quality') NOT IN ('full','partial') OR
  json_extract(fields_json,'$.evidence_level') NOT IN ('S1','S2','S3') OR
  json_extract(fields_json,'$.processing_status') NOT IN ('summarized','linked')
)`)) === 0, "source policy is violated");
assert(Number(scalar("SELECT COUNT(*) FROM objects WHERE id IN ('company.test-co','note.browserbase-research-run-2026-07-11')")) === 0, "known internal/test objects are present");
assert(Number(scalar("SELECT COUNT(*) FROM objects WHERE body LIKE '%/Users/%' OR body LIKE '%/tmp/%' OR body LIKE '%pinix_session=%'")) === 0, "sensitive paths or session data are present");
assert(Number(scalar("SELECT COUNT(*) FROM public_assets")) === assets.length, "asset projection count does not match manifest output");
assert(assets.every((asset) => manifest.asset_allowlist.includes(asset.path)), "an asset is not explicitly allowlisted");

const objects = JSON.parse(execFileSync("sqlite3", ["-json", db, "SELECT id,body FROM objects WHERE body <> ''"], { encoding: "utf8" }) || "[]");
const publicIDs = new Set(JSON.parse(execFileSync("sqlite3", ["-json", db, "SELECT id FROM objects"], { encoding: "utf8" }) || "[]").map((row) => row.id));
for (const object of objects) {
  for (const match of object.body.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
    assert(publicIDs.has(match[1]), `${object.id} links to non-public object ${match[1]}`);
  }
}

const publicTypes = new Set(Object.keys(manifest.field_allowlist));
const typeDefinitions = JSON.parse(scalar("SELECT value FROM metadata WHERE key='type_definitions'"));
for (const type of typeDefinitions) {
  assert(publicTypes.has(type.id), `private type definition ${type.id} is present`);
  for (const field of type.fields || []) {
    assert((manifest.field_allowlist[type.id] || []).includes(field.name), `private field ${type.id}.${field.name} is present`);
    assert(!field.target_type || publicTypes.has(field.target_type), `field ${type.id}.${field.name} targets private type ${field.target_type}`);
  }
}

const graphViews = JSON.parse(scalar("SELECT value FROM metadata WHERE key='graph_views'"));
for (const view of graphViews.views || []) {
  assert(publicTypes.has(view.root_type), `graph view ${view.id} has private root type ${view.root_type}`);
  assert(!/(笔记|方法)/.test(view.description || ""), `graph view ${view.id} describes unpublished data`);
  for (const path of view.paths || []) {
    for (const step of path.steps || []) assert(publicTypes.has(step.target_type), `graph view ${view.id} targets private type ${step.target_type}`);
  }
  for (const type of Object.keys(view.nodes || {})) assert(publicTypes.has(type), `graph view ${view.id} renders private node type ${type}`);
  for (const type of Object.keys(view.bridges || {})) assert(publicTypes.has(type), `graph view ${view.id} folds private bridge type ${type}`);
}

rmSync(db, { force: true });
console.log(`Publication check passed: ${manifest.companies.length} companies, ${assets.length} assets`);
