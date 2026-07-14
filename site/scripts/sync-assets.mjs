import { spawn } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";

const vault = resolve(process.argv[2] || "..");
const root = resolve(vault, "assets");
const publication = JSON.parse(readFileSync(resolve("generated/public-assets.json"), "utf8"));
const allowed = new Set(publication.map((asset) => asset.path));
const bucket = "oh-my-ai-company-assets";
const wrangler = process.env.WRANGLER || resolve("node_modules/.bin/wrangler");
const concurrency = 4;

const contentTypes = new Map([
  ["avif", "image/avif"], ["gif", "image/gif"], ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"], ["json", "application/json"], ["pdf", "application/pdf"],
  ["png", "image/png"], ["svg", "image/svg+xml"], ["webp", "image/webp"]
]);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function runOnce(action, file) {
  const rel = relative(root, file).split(sep).join("/");
  const key = `${bucket}/assets/${rel}`;
  const ext = basename(file).split(".").pop()?.toLowerCase() || "";
  const args = action === "put"
    ? ["r2", "object", "put", key, "--file", file, "--content-type", contentTypes.get(ext) || "application/octet-stream", "--cache-control", "public, max-age=31536000, immutable", "--remote"]
    : ["r2", "object", "delete", key, "--remote"];
  return new Promise((resolvePromise, reject) => {
    const child = spawn(wrangler, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("exit", (code) => code === 0 ? resolvePromise({ action, rel }) : reject(new Error(`${action} ${rel}: ${stderr.trim()}`)));
  });
}

async function execute(action, file) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      return await runOnce(action, file);
    } catch (error) {
      lastError = error;
      if (attempt < 4) await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * 750));
    }
  }
  throw lastError;
}

const files = walk(root).filter((file) => statSync(file).isFile());
const operations = files.map((file) => {
  const path = `assets/${relative(root, file).split(sep).join("/")}`;
  return { action: allowed.has(path) ? "put" : "delete", file };
});
for (const asset of allowed) {
  const file = resolve(vault, asset);
  if (!files.includes(file)) throw new Error(`public asset is missing locally: ${asset}`);
}

let cursor = 0;
let completed = 0;
async function worker() {
  while (cursor < operations.length) {
    const operation = operations[cursor++];
    const result = await execute(operation.action, operation.file);
    completed += 1;
    console.log(`[${completed}/${operations.length}] ${result.action} ${result.rel}`);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, operations.length) }, worker));
console.log(`Published ${allowed.size} referenced assets and removed ${operations.length - allowed.size} unreferenced assets from ${bucket}`);
