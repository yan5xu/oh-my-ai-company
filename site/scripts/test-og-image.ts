import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { firstObjectImage, type PublicAsset, type SEOObject } from "../src/seo";

function object(body: string, bodyPath = "bodies/investor.example.md"): SEOObject {
  return {
    id: "investor.example",
    type_id: "investor",
    title: "Example",
    body,
    body_html: "",
    body_path: bodyPath,
    fields_json: "{}",
    created_at: "2026-07-21T00:00:00Z",
    updated_at: "2026-07-21T00:00:00Z"
  };
}

function asset(path: string, contentType: string, width: number, height: number): PublicAsset {
  return { path, content_type: contentType, width, height };
}

function normalizeAssetPath(path: string, base: string) {
  const source = path.split("#")[0].split("?")[0];
  const prefix = base.includes("/") ? base.slice(0, base.lastIndexOf("/") + 1) : "";
  const parts = (source.startsWith("/") ? source.slice(1) : `${prefix}${source}`).split("/");
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") resolved.pop(); else resolved.push(part);
  }
  return resolved.join("/");
}

const generalCatalyst = object([
  "![General Catalyst wordmark](../assets/general-catalyst/wordmark.svg)",
  "![Fund XII](../assets/general-catalyst/fund-xii.png)"
].join("\n"));
assert.equal(
  firstObjectImage(generalCatalyst, [
    asset("assets/general-catalyst/wordmark.svg", "image/svg+xml", 720, 80),
    asset("assets/general-catalyst/fund-xii.png", "image/png", 1600, 900)
  ], normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/general-catalyst/fund-xii.png"
);

const leonis = object([
  "![Leonis wordmark](../assets/leonis/wordmark.png)",
  "![Leonis homepage](../assets/leonis/home.png)"
].join("\n"));
assert.equal(
  firstObjectImage(leonis, [
    asset("assets/leonis/wordmark.png", "image/png", 1280, 187),
    asset("assets/leonis/home.png", "image/png", 1920, 1080)
  ], normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/leonis/home.png"
);

const mixedMarkup = object([
  '<img src="../assets/example/first.webp" alt="First">',
  "![Second](../assets/example/second.png)"
].join("\n"));
assert.equal(
  firstObjectImage(mixedMarkup, [
    asset("assets/example/first.webp", "image/webp", 1200, 630),
    asset("assets/example/second.png", "image/png", 1200, 630)
  ], normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/example/first.webp"
);

const onlyIneligible = object("![Logo](../assets/example/logo.png)");
assert.equal(
  firstObjectImage(onlyIneligible, [asset("assets/example/logo.png", "image/png", 1200, 630)], normalizeAssetPath),
  "https://companies.yan5xu.ai/og-default.png"
);

const tallScreenshot = object([
  "![Tall screenshot](../assets/example/tall.png)",
  "![Representative screenshot](../assets/example/representative.png)"
].join("\n"));
assert.equal(
  firstObjectImage(tallScreenshot, [
    asset("assets/example/tall.png", "image/png", 598, 20580),
    asset("assets/example/representative.png", "image/png", 2400, 1392)
  ], normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/example/representative.png"
);

async function actualAsset(path: string, contentType: string): Promise<PublicAsset> {
  const metadata = await sharp(resolve("..", path)).metadata();
  return {
    path,
    content_type: contentType,
    width: metadata.width || null,
    height: metadata.height || null
  };
}

const actualGeneralCatalyst = object(
  readFileSync(resolve("..", "bodies/investor.general-catalyst.md"), "utf8"),
  "bodies/investor.general-catalyst.md"
);
assert.equal(
  firstObjectImage(actualGeneralCatalyst, await Promise.all([
    actualAsset("assets/general-catalyst/wordmark.svg", "image/svg+xml"),
    actualAsset("assets/general-catalyst/fund-xii.png", "image/png")
  ]), normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/general-catalyst/fund-xii.png"
);

const actualLeonis = object(
  readFileSync(resolve("..", "bodies/investor.leonis-capital.md"), "utf8"),
  "bodies/investor.leonis-capital.md"
);
assert.equal(
  firstObjectImage(actualLeonis, await Promise.all([
    actualAsset("assets/leonis/wordmark.png", "image/png"),
    actualAsset("assets/leonis/home.png", "image/png"),
    actualAsset("assets/leonis/team.png", "image/png"),
    actualAsset("assets/leonis/portfolio.png", "image/png"),
    actualAsset("assets/leonis/alpha-program.png", "image/png")
  ]), normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/leonis/home.png"
);

const actualMonidSource = object(
  readFileSync(resolve("..", "bodies/source.monid.homepage-2026-07-22.md"), "utf8"),
  "bodies/source.monid.homepage-2026-07-22.md"
);
assert.equal(
  firstObjectImage(actualMonidSource, await Promise.all([
    actualAsset("assets/monid/homepage-2026-07-22.png", "image/png"),
    actualAsset("assets/monid/pricing-failure-faq-2026-07-22.png", "image/png")
  ]), normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/monid/pricing-failure-faq-2026-07-22.png"
);

const actualMonidCompany = object(
  readFileSync(resolve("..", "bodies/company.monid.md"), "utf8"),
  "bodies/company.monid.md"
);
assert.equal(
  firstObjectImage(actualMonidCompany, await Promise.all([
    actualAsset("assets/monid/tools-catalog-2026-07-22.png", "image/png"),
    actualAsset("assets/monid/app-signup-2026-07-22.png", "image/png")
  ]), normalizeAssetPath),
  "https://companies.yan5xu.ai/media/assets/monid/tools-catalog-2026-07-22.png"
);

console.log("OG image policy tests passed");
