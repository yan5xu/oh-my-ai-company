import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { buildRemoteState, createSyncPlan } from "./asset-sync-plan.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");
const vaultArgument = args.find((argument) => !argument.startsWith("--")) || "..";
const vault = resolve(vaultArgument);
const publication = JSON.parse(readFileSync(resolve("generated/public-assets.json"), "utf8"));
const bucket = "oh-my-ai-company-assets";
const stateKey = "_publication/public-assets-v1.json";
const stateObject = `${bucket}/${stateKey}`;
const wrangler = process.env.WRANGLER || resolve("node_modules/.bin/wrangler");
const concurrency = Math.max(1, Number.parseInt(process.env.ASSET_SYNC_CONCURRENCY || "4", 10) || 4);
const retryDelayMilliseconds = Math.max(0, Number.parseInt(process.env.ASSET_SYNC_RETRY_DELAY_MS || "750", 10) || 0);
const temporaryDirectory = mkdtempSync(join(tmpdir(), "omac-r2-assets-"));
const downloadedStatePath = join(temporaryDirectory, "previous-state.json");
const nextStatePath = join(temporaryDirectory, "next-state.json");

function runWrangler(commandArgs) {
  return new Promise((resolvePromise) => {
    const child = spawn(wrangler, commandArgs, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => resolvePromise({ code: -1, stdout, stderr: `${stderr}\n${error.message}` }));
    child.on("exit", (code) => resolvePromise({ code: code ?? -1, stdout, stderr }));
  });
}

function commandError(label, result) {
  return new Error(`${label}: ${(result.stderr || result.stdout || `exit ${result.code}`).trim()}`);
}

function isMissingObject(result) {
  return result.code !== 0 && /(?:NoSuchKey|not found|does not exist|no such object|\b404\b)/i.test(`${result.stdout}\n${result.stderr}`);
}

async function readPreviousState() {
  const result = await runWrangler(["r2", "object", "get", stateObject, "--file", downloadedStatePath, "--remote"]);
  if (result.code === 0) return JSON.parse(readFileSync(downloadedStatePath, "utf8"));
  if (isMissingObject(result)) return null;
  throw commandError(`fetch ${stateKey}`, result);
}

async function runWithRetry(label, commandArgs) {
  let lastResult;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    lastResult = await runWrangler(commandArgs);
    if (lastResult.code === 0) return;
    if (attempt < 4 && retryDelayMilliseconds > 0) {
      await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * retryDelayMilliseconds));
    }
  }
  throw commandError(label, lastResult);
}

async function executePool(entries, action) {
  let cursor = 0;
  let completed = 0;
  async function worker() {
    while (cursor < entries.length) {
      const entry = entries[cursor++];
      const object = `${bucket}/${entry.path}`;
      const commandArgs = action === "put"
        ? ["r2", "object", "put", object, "--file", resolve(vault, entry.path), "--content-type", entry.content_type, "--cache-control", entry.cache_control, "--remote"]
        : ["r2", "object", "delete", object, "--remote"];
      await runWithRetry(`${action} ${entry.path}`, commandArgs);
      completed += 1;
      console.log(`[${completed}/${entries.length}] ${action} ${entry.path}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, entries.length) }, worker));
}

try {
  for (const entry of publication) {
    const localPath = resolve(vault, entry.path);
    if (!localPath.startsWith(`${vault}/`) || basename(localPath) === "") throw new Error(`invalid public asset path: ${entry.path}`);
    const bytes = readFileSync(localPath, { flag: "r" });
    const sha256 = createHash("sha256").update(bytes).digest("hex");
    if (bytes.byteLength !== entry.size || sha256 !== entry.sha256) {
      throw new Error(`public asset changed after export: ${entry.path}; rerun publication:check`);
    }
  }

  const previousState = await readPreviousState();
  const plan = createSyncPlan(publication, previousState);
  console.log(`${dryRun ? "Dry run" : "Plan"}: ${plan.puts.length} put, ${plan.deletes.length} delete, ${plan.unchanged.length} unchanged${plan.bootstrap ? " (initial manifest bootstrap)" : ""}`);
  if (verbose) {
    for (const entry of plan.puts) console.log(`  PUT ${entry.path}`);
    for (const entry of plan.deletes) console.log(`  DELETE ${entry.path}`);
  }

  if (dryRun) process.exitCode = 0;
  else {
    await executePool(plan.puts, "put");
    await executePool(plan.deletes, "delete");
    writeFileSync(nextStatePath, `${JSON.stringify(buildRemoteState(publication), null, 2)}\n`);
    await runWithRetry(`publish ${stateKey}`, [
      "r2", "object", "put", stateObject,
      "--file", nextStatePath,
      "--content-type", "application/json",
      "--cache-control", "no-store",
      "--remote"
    ]);
    console.log(`Asset sync complete: ${plan.puts.length} uploaded, ${plan.deletes.length} removed, ${plan.unchanged.length} skipped; state manifest published last`);
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
