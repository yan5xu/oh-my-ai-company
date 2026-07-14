const base = new URL(process.argv[2] || "http://127.0.0.1:8788");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function read(path, options = {}) {
  const response = await fetch(new URL(path, base), options);
  return { response, body: await response.text() };
}

function includesAll(body, values, context) {
  for (const value of values) assert(body.includes(value), `${context}: missing ${JSON.stringify(value)}`);
}

const home = await read("/");
assert(home.response.status === 200, `home: expected 200, got ${home.response.status}`);
includesAll(home.body, [
  "<title>Oh My AI Company — Evidence-traceable AI company atlas</title>",
  '<meta name="google-site-verification" content="y58gkdLQcQrxFG3fj1Xyf6zhNXpxUNLQ-yYLa1ffPTk">',
  '<meta name="ahrefs-site-verification" content="7eac0aad1691283de095cbce82756447c55a0bb8368c45f0ec2b75c6dc99d99b">',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="canonical" href="https://companies.yan5xu.ai/">',
  'type="application/ld+json"',
  "Follow AI companies through evidence"
], "home");

const company = await read("/companies/kernel");
assert(company.response.status === 200, `company: expected 200, got ${company.response.status}`);
assert(company.response.headers.get("x-robots-tag") === "index, follow", "company: expected index header");
includesAll(company.body, [
  "<title>Kernel — AI company profile, founders and evidence | OMAC</title>",
  '<link rel="canonical" href="https://companies.yan5xu.ai/companies/kernel">',
  '<html lang="zh-CN">',
  "Kernel 是为 AI agents 提供云浏览器",
  'href="/people/catherine-jue"',
  'src="/media/assets/kernel/wordmark.png"',
  '"@type":"Organization"'
], "company");

const investor = await read("/investors/accel");
assert(investor.response.status === 200, `investor: expected 200, got ${investor.response.status}`);
includesAll(investor.body, ["<title>Accel — AI portfolio, people and investments | OMAC</title>", "Connected research"], "investor");

const collection = await read("/companies");
assert(collection.response.status === 200, `collection: expected 200, got ${collection.response.status}`);
includesAll(collection.body, ["<h1>Companies</h1>", 'href="/companies/kernel"', '"@type":"CollectionPage"'], "collection");

const graph = await read("/graph");
assert(graph.response.status === 200, `graph: expected 200, got ${graph.response.status}`);
includesAll(graph.body, ['<meta name="robots" content="noindex,follow">', "Interactive graph workspace"], "graph");

const weakSource = await read("/sources/agent-card.aisa-api-2026-07-08");
assert(weakSource.response.status === 200, `weak source: expected 200, got ${weakSource.response.status}`);
assert(weakSource.response.headers.get("x-robots-tag") === "noindex, follow", "weak source: expected noindex header");

const missing = await read("/companies/definitely-not-an-object");
assert(missing.response.status === 404, `missing: expected 404, got ${missing.response.status}`);
includesAll(missing.body, ["Research object not found", '<meta name="robots" content="noindex,follow">'], "missing");

const sitemap = await read("/sitemap.xml");
assert(sitemap.response.status === 200, `sitemap: expected 200, got ${sitemap.response.status}`);
assert(sitemap.response.headers.get("content-type")?.includes("application/xml"), "sitemap: expected XML content type");
includesAll(sitemap.body, ["<sitemapindex", "/sitemaps/companies.xml", "/sitemaps/sources.xml"], "sitemap");

const companiesSitemap = await read("/sitemaps/companies.xml");
assert(companiesSitemap.response.status === 200, "company sitemap: expected 200");
includesAll(companiesSitemap.body, ["<urlset", "https://companies.yan5xu.ai/companies/kernel", "<lastmod>"], "company sitemap");

const robots = await read("/robots.txt");
assert(robots.response.status === 200, `robots: expected 200, got ${robots.response.status}`);
includesAll(robots.body, ["Disallow: /api/", "Sitemap: https://companies.yan5xu.ai/sitemap.xml"], "robots");

const indexNowKey = await read("/395a13fe1103f644f6ad99fd1623fe09.txt");
assert(indexNowKey.response.status === 200, `IndexNow key: expected 200, got ${indexNowKey.response.status}`);
assert(indexNowKey.body.trim() === "395a13fe1103f644f6ad99fd1623fe09", "IndexNow key: unexpected body");
assert(indexNowKey.response.headers.get("x-robots-tag") === "noindex, nofollow", "IndexNow key: expected noindex header");

const redirect = await fetch(new URL("/?view=detail&type=company&object=company.kernel", base), { redirect: "manual" });
assert(redirect.status === 301, `legacy redirect: expected 301, got ${redirect.status}`);
assert(redirect.headers.get("location") === new URL("/companies/kernel", base).toString(), `legacy redirect: unexpected location ${redirect.headers.get("location")}`);

const image = await fetch(new URL("/og-default.png", base));
assert(image.status === 200, `default image: expected 200, got ${image.status}`);
assert(image.headers.get("content-type") === "image/png", `default image: unexpected content type ${image.headers.get("content-type")}`);

const favicon = await fetch(new URL("/favicon.svg", base));
assert(favicon.status === 200, `favicon: expected 200, got ${favicon.status}`);
assert(favicon.headers.get("content-type")?.includes("image/svg+xml"), `favicon: unexpected content type ${favicon.headers.get("content-type")}`);

const legacyFavicon = await fetch(new URL("/favicon.ico", base), { redirect: "manual" });
assert(legacyFavicon.status === 301, `legacy favicon: expected 301, got ${legacyFavicon.status}`);
assert(legacyFavicon.headers.get("location") === new URL("/favicon.svg", base).toString(), "legacy favicon: unexpected location");

console.log(`SEO verification passed: ${base}`);
