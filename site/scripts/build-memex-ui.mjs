import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const webRoot = resolve(siteRoot, "vendor/memex/web");
const lockfile = resolve(webRoot, "package-lock.json");

if (!existsSync(lockfile)) {
  throw new Error("Memex frontend is missing. Run: git submodule update --init --recursive");
}

execFileSync("npm", ["ci"], { cwd: webRoot, stdio: "inherit" });
execFileSync("npm", ["run", "build"], {
  cwd: webRoot,
  env: { ...process.env, MEMEX_WEB_OUT_DIR: resolve(siteRoot, "dist") },
  stdio: "inherit"
});
