import { spawn } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { basename, join, relative, resolve, sep } from "node:path";

const vault = resolve(process.argv[2] || "..");
const root = resolve(vault, "assets");
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

function run(file) {
  const rel = relative(root, file).split(sep).join("/");
  const ext = basename(file).split(".").pop()?.toLowerCase() || "";
  const args = [
    "r2", "object", "put", `${bucket}/assets/${rel}`,
    "--file", file,
    "--content-type", contentTypes.get(ext) || "application/octet-stream",
    "--cache-control", "public, max-age=31536000, immutable",
    "--remote"
  ];
  return new Promise((resolvePromise, reject) => {
    const child = spawn(wrangler, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("exit", (code) => code === 0 ? resolvePromise(rel) : reject(new Error(`${rel}: ${stderr.trim()}`)));
  });
}

const files = walk(root).filter((file) => statSync(file).isFile());
let cursor = 0;
let uploaded = 0;

async function worker() {
  while (cursor < files.length) {
    const index = cursor++;
    const rel = await run(files[index]);
    uploaded += 1;
    console.log(`[${uploaded}/${files.length}] ${rel}`);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, worker));
console.log(`Uploaded ${uploaded} assets to ${bucket}`);
