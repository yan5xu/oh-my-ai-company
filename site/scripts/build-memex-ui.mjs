import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const webRoot = resolve(siteRoot, "vendor/memex/web");
const lockfile = resolve(webRoot, "package-lock.json");
const siteExtension = resolve(siteRoot, "src/site-extension.tsx");
const siteContent = resolve(siteRoot, "src/**/*.{ts,tsx}");

if (!existsSync(lockfile)) {
  throw new Error("Memex frontend is missing. Run: git submodule update --init --recursive");
}

execFileSync("npm", ["ci"], { cwd: webRoot, stdio: "inherit" });
execFileSync("npm", ["run", "build"], {
  cwd: webRoot,
  env: {
    ...process.env,
    MEMEX_WEB_OUT_DIR: resolve(siteRoot, "dist"),
    MEMEX_SITE_EXTENSION: siteExtension,
    MEMEX_SITE_CONTENT: siteContent,
    MEMEX_SITE_TITLE: "Oh My AI Company",
    MEMEX_SITE_DESCRIPTION: "An open research atlas of AI companies, founders, investors, evidence, and market signals.",
    MEMEX_SITE_THEME_COLOR: "#f8f8f5"
  },
  stdio: "inherit"
});

copyFileSync(
  resolve(siteRoot, "src/home/assets/research-graph.png"),
  resolve(siteRoot, "dist/og-default.png")
);
copyFileSync(
  resolve(siteRoot, "src/home/assets/favicon.svg"),
  resolve(siteRoot, "dist/favicon.svg")
);
