import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const config = JSON.parse(readFileSync(resolve("seo.config.json"), "utf8"));
const current = JSON.parse(readFileSync(resolve("generated/indexnow-manifest.json"), "utf8"));
const key = String(config.site.indexnow_key || "");
const host = new URL(config.site.base_url).host;
const endpoint = "https://api.indexnow.org/indexnow";
const keyLocation = `${config.site.base_url}/${key}.txt`;
const dryRun = process.argv.includes("--dry-run");
const forceAll = process.argv.includes("--all");
const storeOnly = process.argv.includes("--store-only");
const wrangler = resolve("node_modules/.bin/wrangler");
const database = "oh-my-ai-company-prod";

if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) throw new Error("invalid IndexNow key");
if (current.version !== 1 || !Array.isArray(current.entries) || current.entries.length === 0) throw new Error("invalid IndexNow manifest");
if (current.entries.some((entry) => new URL(entry.url).host !== host || !/^[a-f0-9]{64}$/.test(entry.fingerprint))) {
  throw new Error("IndexNow manifest contains an invalid entry");
}

function queryPreviousManifest() {
  const raw = execFileSync(wrangler, [
    "d1", "execute", database, "--remote",
    "--command", "SELECT url,fingerprint FROM indexnow_state ORDER BY url",
    "--json"
  ], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  const entries = JSON.parse(raw)?.[0]?.results || [];
  return { version: 1, entries };
}

function changedURLs(previous) {
  const before = new Map((previous.entries || []).map((entry) => [entry.url, entry.fingerprint]));
  const after = new Map(current.entries.map((entry) => [entry.url, entry.fingerprint]));
  const changed = current.entries
    .filter((entry) => forceAll || before.get(entry.url) !== entry.fingerprint)
    .map((entry) => entry.url);
  const removed = [...before.keys()].filter((url) => !after.has(url));
  return [...new Set([...changed, ...removed])].sort();
}

async function verifyKey() {
  const response = await fetch(keyLocation, { headers: { "user-agent": "OMAC IndexNow publisher/1.0" } });
  const body = await response.text();
  if (!response.ok || body.trim() !== key) throw new Error(`IndexNow key verification failed: ${response.status}`);
}

async function submitBatch(urlList) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation, urlList })
    });
    if (response.status === 200 || response.status === 202) return response.status;
    const body = (await response.text()).slice(0, 500);
    lastError = new Error(`IndexNow returned ${response.status}: ${body}`);
    const verificationPending = response.status === 403 && body.includes("SiteVerificationNotCompleted");
    if (!verificationPending && response.status !== 429 && response.status < 500) break;
    if (attempt < 5) {
      const delay = verificationPending ? attempt * 5000 : attempt * 1000;
      console.log(`IndexNow retry ${attempt}/5 in ${delay}ms: HTTP ${response.status}`);
      await new Promise((resolvePromise) => setTimeout(resolvePromise, delay));
    }
  }
  throw lastError;
}

function storeManifest() {
  const sqlPath = resolve("generated/indexnow-state.sql");
  const submittedAt = new Date().toISOString();
  const sqlString = (value) => `'${String(value).replaceAll("'", "''")}'`;
  const statements = [
    ...current.entries.map((entry) => `INSERT INTO indexnow_state (url,fingerprint,submitted_at) VALUES (${sqlString(entry.url)},${sqlString(entry.fingerprint)},${sqlString(submittedAt)}) ON CONFLICT(url) DO UPDATE SET fingerprint=excluded.fingerprint,submitted_at=excluded.submitted_at;`),
    `DELETE FROM indexnow_state WHERE submitted_at <> ${sqlString(submittedAt)};`
  ];
  writeFileSync(sqlPath, `${statements.join("\n")}\n`);
  execFileSync(wrangler, ["d1", "execute", database, "--remote", "--file", sqlPath], { stdio: "inherit" });
}

const previous = queryPreviousManifest();
const urls = changedURLs(previous);
console.log(`IndexNow changes: ${urls.length} URL(s); previous=${previous.entries?.length || 0}, current=${current.entries.length}`);

if (dryRun) {
  for (const url of urls.slice(0, 25)) console.log(url);
  if (urls.length > 25) console.log(`... ${urls.length - 25} more`);
  process.exit(0);
}

if (storeOnly) {
  storeManifest();
  console.log("IndexNow state saved without submitting URLs");
  process.exit(0);
}

if (urls.length === 0) process.exit(0);
await verifyKey();
for (let offset = 0; offset < urls.length; offset += 10_000) {
  const batch = urls.slice(offset, offset + 10_000);
  const status = await submitBatch(batch);
  console.log(`IndexNow accepted ${batch.length} URL(s): HTTP ${status}`);
}
storeManifest();
console.log("IndexNow state saved to D1");
