import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRemoteState, createSyncPlan, parseRemoteState } from "./asset-sync-plan.mjs";

function asset(path, sha256, overrides = {}) {
  return {
    path,
    sha256: sha256.repeat(64),
    size: 100,
    content_type: "image/png",
    ...overrides
  };
}

const first = asset("assets/first.png", "a");
const second = asset("assets/second.png", "b");
const initial = createSyncPlan([first, second]);
assert.equal(initial.bootstrap, true);
assert.deepEqual(initial.puts.map((entry) => entry.path), [first.path, second.path]);
assert.deepEqual(initial.deletes, []);

const previous = buildRemoteState([first, second], "2026-07-22T00:00:00.000Z");
const unchanged = createSyncPlan([first, second], previous);
assert.equal(unchanged.bootstrap, false);
assert.equal(unchanged.puts.length, 0);
assert.equal(unchanged.deletes.length, 0);
assert.equal(unchanged.unchanged.length, 2);

const changedFirst = asset(first.path, "c");
const third = asset("assets/third.webp", "d", { content_type: "image/webp", size: 200 });
const delta = createSyncPlan([changedFirst, third], previous);
assert.deepEqual(delta.puts.map((entry) => entry.path), [first.path, third.path]);
assert.deepEqual(delta.deletes.map((entry) => entry.path), [second.path]);
assert.equal(delta.unchanged.length, 0);

assert.throws(() => parseRemoteState({ version: 2, assets: [] }), /unsupported format/);
assert.throws(() => createSyncPlan([asset("../outside.png", "e")]), /invalid path/);
assert.throws(() => createSyncPlan([first, first]), /duplicate paths/);

const testRoot = mkdtempSync(join(tmpdir(), "omac-asset-sync-test-"));
const vault = join(testRoot, "vault");
const work = join(testRoot, "work");
const remote = join(testRoot, "remote");
const operations = join(testRoot, "operations.log");
mkdirSync(join(vault, "assets"), { recursive: true });
mkdirSync(join(work, "generated"), { recursive: true });
mkdirSync(remote, { recursive: true });

function writePublication(files) {
  const entries = Object.entries(files).map(([path, content]) => {
    const target = join(vault, path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    return {
      path,
      sha256: createHash("sha256").update(content).digest("hex"),
      size: Buffer.byteLength(content),
      content_type: "image/png"
    };
  });
  writeFileSync(join(work, "generated/public-assets.json"), JSON.stringify(entries));
  return entries;
}

const fakeWrangler = join(testRoot, "fake-wrangler.mjs");
writeFileSync(fakeWrangler, `#!/usr/bin/env node
import { appendFileSync, copyFileSync, existsSync } from "node:fs";
const args = process.argv.slice(2);
const operation = args[2];
const object = args[3];
const file = args[args.indexOf("--file") + 1];
const state = process.env.FAKE_R2_STATE;
if (operation === "get") {
  if (!existsSync(state)) { console.error("NoSuchKey: object not found"); process.exit(1); }
  copyFileSync(state, file);
  process.exit(0);
}
appendFileSync(process.env.FAKE_R2_LOG, \`${"${operation} ${object}"}\\n\`);
if (process.env.FAKE_R2_FAIL && object.includes(process.env.FAKE_R2_FAIL)) {
  console.error("injected failure");
  process.exit(1);
}
if (operation === "put" && object.endsWith("_publication/public-assets-v1.json")) copyFileSync(file, state);
`);
chmodSync(fakeWrangler, 0o755);

const syncScript = resolve(dirname(fileURLToPath(import.meta.url)), "sync-assets.mjs");
const environment = {
  ...process.env,
  WRANGLER: fakeWrangler,
  FAKE_R2_STATE: join(remote, "state.json"),
  FAKE_R2_LOG: operations,
  ASSET_SYNC_RETRY_DELAY_MS: "0"
};

try {
  const firstPublication = writePublication({ "assets/first.png": "first" });
  const bootstrap = spawnSync(process.execPath, [syncScript, vault], { cwd: work, env: environment, encoding: "utf8" });
  assert.equal(bootstrap.status, 0, bootstrap.stderr);
  assert.match(bootstrap.stdout, /1 put, 0 delete, 0 unchanged \(initial manifest bootstrap\)/);
  assert.deepEqual(parseRemoteState(readFileSync(environment.FAKE_R2_STATE, "utf8")).assets.map((entry) => entry.path), [firstPublication[0].path]);
  assert.deepEqual(readFileSync(operations, "utf8").trim().split("\n"), [
    "put oh-my-ai-company-assets/assets/first.png",
    "put oh-my-ai-company-assets/_publication/public-assets-v1.json"
  ]);

  const priorState = readFileSync(environment.FAKE_R2_STATE, "utf8");
  writePublication({ "assets/first.png": "changed", "assets/second.png": "second" });
  const failed = spawnSync(process.execPath, [syncScript, vault], {
    cwd: work,
    env: { ...environment, FAKE_R2_FAIL: "assets/second.png" },
    encoding: "utf8"
  });
  assert.notEqual(failed.status, 0);
  assert.equal(readFileSync(environment.FAKE_R2_STATE, "utf8"), priorState, "failed sync advanced remote state");

  const recovered = spawnSync(process.execPath, [syncScript, vault], { cwd: work, env: environment, encoding: "utf8" });
  assert.equal(recovered.status, 0, recovered.stderr);
  assert.match(recovered.stdout, /2 put, 0 delete, 0 unchanged/);
  assert.equal(parseRemoteState(readFileSync(environment.FAKE_R2_STATE, "utf8")).assets.length, 2);
} finally {
  rmSync(testRoot, { recursive: true, force: true });
}
console.log("Asset sync planner tests passed");
