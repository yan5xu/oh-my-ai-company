import seoConfigJSON from "../seo.config.json";

export type SEOObject = {
  id: string;
  type_id: string;
  title: string;
  body: string;
  body_html: string;
  body_path: string;
  fields_json: string;
  created_at: string;
  updated_at: string;
};

export type SEORelation = {
  object_id: string;
  title: string;
  type_id: string;
  relation: string;
  direction: "in" | "out";
};

type RouteConfig = { collection: string; id_prefix: string; label: string };
type SEOConfig = {
  version: number;
  site: {
    name: string;
    short_name: string;
    base_url: string;
    default_title: string;
    default_description: string;
    default_image: string;
    github_url: string;
    google_site_verification?: string;
    indexnow_key?: string;
  };
  routes: Record<string, RouteConfig>;
  indexing: {
    collection_types: string[];
    primary_types: string[];
    minimum_body_chars: Record<string, number>;
    source_quality: string[];
    source_evidence_levels: string[];
    source_processing_status: string[];
  };
  visible_fields: Record<string, string[]>;
};

export const seoConfig = seoConfigJSON as SEOConfig;

const routeByCollection = new Map(
  Object.entries(seoConfig.routes).map(([type, route]) => [route.collection, { type, ...route }])
);

export function escapeHTML(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeXML(value: unknown) {
  return escapeHTML(value);
}

export function absoluteURL(path: string) {
  return new URL(path, `${seoConfig.site.base_url}/`).toString();
}

export function routeForType(type: string) {
  return seoConfig.routes[type] || null;
}

export function routeForCollection(collection: string) {
  return routeByCollection.get(collection) || null;
}

export function objectPath(object: Pick<SEOObject, "id" | "type_id">) {
  const route = routeForType(object.type_id);
  if (!route) return `/objects/${encodeURIComponent(object.id)}`;
  const prefix = `${route.id_prefix}.`;
  const slug = object.id.startsWith(prefix) ? object.id.slice(prefix.length) : object.id;
  return `/${route.collection}/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export function objectIDFromPath(collection: string, rawSlug: string) {
  const route = routeForCollection(collection);
  if (!route) return null;
  let slug = "";
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    return null;
  }
  return { type: route.type, id: `${route.id_prefix}.${slug}` };
}

export function parseFields(object: Pick<SEOObject, "fields_json">) {
  try {
    return JSON.parse(object.fields_json || "{}") as Record<string, unknown>;
  } catch {
    return {};
  }
}

function fieldText(fields: Record<string, unknown>, names: string[]) {
  for (const name of names) {
    const value = fields[name];
    if (Array.isArray(value) && value.length > 0) return value.map(String).join(", ");
    if (value !== undefined && value !== null && String(value).trim()) return String(value).trim();
  }
  return "";
}

function bodyPlainText(body: string) {
  return body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, id, label) => label || id)
    .replace(/<[^>]+>/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/[*_~`|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value: string, length: number) {
  const text = value.trim();
  if (text.length <= length) return text;
  return `${text.slice(0, Math.max(1, length - 1)).trimEnd()}…`;
}

export function objectDescription(object: SEOObject) {
  const fields = parseFields(object);
  const preferred = fieldText(fields, ["one_liner", "description", "definition", "bio", "summary", "statement"]);
  const description = preferred || bodyPlainText(object.body);
  if (description) return truncate(description, 180);
  const route = routeForType(object.type_id);
  return `${object.title} in the Oh My AI Company evidence-traceable research atlas${route ? ` · ${route.label}` : ""}.`;
}

export function objectPageTitle(object: SEOObject) {
  const name = object.title || object.id;
  const suffix = ({
    company: "AI company profile, founders and evidence",
    investor: "AI portfolio, people and investments",
    person: "companies, roles and evidence",
    concept: "AI market concept and evidence",
    "source.item": "research source and evidence"
  } as Record<string, string>)[object.type_id] || `${routeForType(object.type_id)?.label || "Research"} record`;
  return `${name} — ${suffix} | ${seoConfig.site.short_name}`;
}

export function pageLanguage(object?: SEOObject) {
  if (!object) return "en";
  const sample = `${object.title} ${objectDescription(object)} ${object.body.slice(0, 600)}`;
  const cjk = (sample.match(/[\u3400-\u9fff]/g) || []).length;
  const letters = (sample.match(/[A-Za-z\u3400-\u9fff]/g) || []).length;
  return letters > 0 && cjk / letters > 0.18 ? "zh-CN" : "en";
}

function listContains(values: string[], value: unknown) {
  return values.includes(String(value || ""));
}

export function isObjectIndexable(object: SEOObject) {
  const bodyLength = object.body.trim().length;
  const minimum = seoConfig.indexing.minimum_body_chars[object.type_id] || Number.POSITIVE_INFINITY;
  if (bodyLength < minimum) return false;
  if (seoConfig.indexing.primary_types.includes(object.type_id)) return true;
  if (object.type_id !== "source.item") return false;
  const fields = parseFields(object);
  return listContains(seoConfig.indexing.source_quality, fields.quality)
    && listContains(seoConfig.indexing.source_evidence_levels, fields.evidence_level)
    && listContains(seoConfig.indexing.source_processing_status, fields.processing_status);
}

export function collectionIsIndexable(type: string) {
  return seoConfig.indexing.collection_types.includes(type);
}

function safeJSON(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function schemaForObject(object: SEOObject, canonical: string, description: string) {
  const fields = parseFields(object);
  const website = fieldText(fields, ["website", "homepage_url", "url"]);
  const common = {
    "@context": "https://schema.org",
    "@id": canonical,
    name: object.title,
    url: canonical,
    description
  };
  if (object.type_id === "company" || object.type_id === "investor") {
    return { ...common, "@type": "Organization", ...(website ? { sameAs: [website] } : {}) };
  }
  if (object.type_id === "person") {
    return { ...common, "@type": "Person", ...(website ? { sameAs: [website] } : {}) };
  }
  if (object.type_id === "source.item") {
    const published = fieldText(fields, ["published_at"]);
    const author = fieldText(fields, ["author"]);
    return {
      ...common,
      "@type": "Article",
      headline: object.title,
      mainEntityOfPage: canonical,
      dateModified: object.updated_at.slice(0, 10),
      ...(published ? { datePublished: published } : {}),
      ...(author ? { author: { "@type": "Person", name: author } } : {})
    };
  }
  return { ...common, "@type": "Article", headline: object.title, mainEntityOfPage: canonical, dateModified: object.updated_at.slice(0, 10) };
}

function breadcrumbSchema(object: SEOObject, canonical: string) {
  const route = routeForType(object.type_id);
  const items = [
    { "@type": "ListItem", position: 1, name: seoConfig.site.name, item: seoConfig.site.base_url }
  ];
  if (route) {
    items.push({ "@type": "ListItem", position: 2, name: route.label, item: absoluteURL(`/${route.collection}`) });
    items.push({ "@type": "ListItem", position: 3, name: object.title, item: canonical });
  }
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

function visibleFieldRows(object: SEOObject) {
  const fields = parseFields(object);
  return (seoConfig.visible_fields[object.type_id] || []).flatMap((name) => {
    const value = fields[name];
    if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) return [];
    const display = Array.isArray(value) ? value.map(String).join(", ") : String(value);
    if (/^https?:\/\//i.test(display)) {
      return [`<div><dt>${escapeHTML(name.replaceAll("_", " "))}</dt><dd><a href="${escapeHTML(display)}" rel="external noopener noreferrer">${escapeHTML(display)}</a></dd></div>`];
    }
    return [`<div><dt>${escapeHTML(name.replaceAll("_", " "))}</dt><dd>${escapeHTML(display)}</dd></div>`];
  }).join("");
}

function relationRows(relations: SEORelation[]) {
  const seen = new Set<string>();
  return relations.flatMap((relation) => {
    const key = `${relation.object_id}\u0000${relation.relation}\u0000${relation.direction}`;
    if (seen.has(key)) return [];
    seen.add(key);
    const path = objectPath({ id: relation.object_id, type_id: relation.type_id });
    return [`<li><a href="${escapeHTML(path)}">${escapeHTML(relation.title || relation.object_id)}</a><span>${escapeHTML(relation.direction === "out" ? relation.relation : `${relation.relation} · linked from`)}</span></li>`];
  }).join("");
}

export function firstObjectImage(object: SEOObject, normalizeAsset: (path: string, base: string) => string) {
  const markdown = object.body.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/)?.[1];
  const html = object.body.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i)?.[1];
  const source = markdown || html || "";
  if (/^https?:\/\//i.test(source)) return source;
  const key = normalizeAsset(source, object.body_path);
  return key.startsWith("assets/") ? absoluteURL(`/media/${key.split("/").map(encodeURIComponent).join("/")}`) : absoluteURL(seoConfig.site.default_image);
}

export function homeSEOBody() {
  return `<div class="seo-prerender">
    <header><a class="seo-brand" href="/">${escapeHTML(seoConfig.site.name)}</a><nav aria-label="Primary"><a href="/companies">Companies</a><a href="/investors">Investors</a><a href="/people">People</a><a href="/concepts">Concepts</a><a href="/sources">Evidence</a></nav></header>
    <main>
      <p class="seo-eyebrow">Living AI company atlas</p>
      <h1>Follow AI companies through evidence, people, capital, and market signals.</h1>
      <p class="seo-lede">${escapeHTML(seoConfig.site.default_description)}</p>
      <section aria-labelledby="seo-start"><h2 id="seo-start">Start exploring</h2><ul class="seo-links"><li><a href="/companies">Company dossiers</a></li><li><a href="/investors">Investor networks</a></li><li><a href="/concepts">Reusable market concepts</a></li><li><a href="/sources">Traceable evidence</a></li></ul></section>
      <section aria-labelledby="seo-method"><h2 id="seo-method">How the atlas is built</h2><p>Subjects connect to founders and investment events. Sources and traffic snapshots record evidence. Notes, concepts, and methods keep facts separate from research judgment.</p></section>
    </main>
  </div>`;
}

export function collectionSEOBody(type: string, objects: SEOObject[]) {
  const route = routeForType(type);
  const label = route?.label || type;
  const items = objects.map((object) => `<li><a href="${escapeHTML(objectPath(object))}"><strong>${escapeHTML(object.title || object.id)}</strong><span>${escapeHTML(objectDescription(object))}</span></a></li>`).join("");
  return `<div class="seo-prerender">
    <header><a class="seo-brand" href="/">${escapeHTML(seoConfig.site.name)}</a><nav aria-label="Breadcrumb"><a href="/">Atlas</a><span>/</span><span>${escapeHTML(label)}</span></nav></header>
    <main><p class="seo-eyebrow">Research collection</p><h1>${escapeHTML(label)}</h1><p class="seo-lede">Browse ${escapeHTML(label.toLowerCase())} in the evidence-traceable AI company atlas.</p><ol class="seo-object-list">${items}</ol></main>
  </div>`;
}

export function objectSEOBody(object: SEOObject, relations: SEORelation[]) {
  const route = routeForType(object.type_id);
  const fields = visibleFieldRows(object);
  const related = relationRows(relations);
  const hasHeading = /<h1\b/i.test(object.body_html);
  return `<div class="seo-prerender">
    <header><a class="seo-brand" href="/">${escapeHTML(seoConfig.site.name)}</a><nav aria-label="Breadcrumb"><a href="/">Atlas</a><span>/</span>${route ? `<a href="/${escapeHTML(route.collection)}">${escapeHTML(route.label)}</a><span>/</span>` : ""}<span>${escapeHTML(object.title)}</span></nav></header>
    <main><article>${hasHeading ? "" : `<h1>${escapeHTML(object.title)}</h1>`}<p class="seo-lede">${escapeHTML(objectDescription(object))}</p>${fields ? `<dl class="seo-fields">${fields}</dl>` : ""}<div class="seo-markdown">${object.body_html}</div></article>${related ? `<aside aria-labelledby="seo-related"><h2 id="seo-related">Connected research</h2><ul class="seo-relations">${related}</ul></aside>` : ""}</main>
  </div>`;
}

export function appSEOBody(title: string, description: string) {
  return `<div class="seo-prerender"><header><a class="seo-brand" href="/">${escapeHTML(seoConfig.site.name)}</a></header><main><h1>${escapeHTML(title)}</h1><p class="seo-lede">${escapeHTML(description)}</p></main></div>`;
}

export function notFoundSEOBody() {
  return `<div class="seo-prerender"><header><a class="seo-brand" href="/">${escapeHTML(seoConfig.site.name)}</a></header><main><p class="seo-eyebrow">404</p><h1>Research object not found</h1><p class="seo-lede">This URL does not match a published object in the atlas.</p><p><a href="/companies">Browse companies</a></p></main></div>`;
}

const prerenderCSS = `<style id="seo-prerender-style">
  .seo-prerender{max-width:1120px;margin:0 auto;padding:24px 28px 72px;color:#202321;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.65}.seo-prerender header{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:12px 0 40px;border-bottom:1px solid #e2e1db}.seo-prerender nav{display:flex;flex-wrap:wrap;gap:14px;align-items:center;font-size:14px}.seo-prerender a{color:#176d66;text-decoration:none}.seo-prerender a:hover{text-decoration:underline}.seo-brand{font-family:Georgia,serif;font-size:20px;color:#202321!important}.seo-prerender main{max-width:820px;padding-top:64px}.seo-prerender h1,.seo-prerender h2,.seo-prerender h3{font-family:Georgia,"Times New Roman",serif;font-weight:500;line-height:1.16}.seo-prerender h1{font-size:clamp(38px,7vw,72px);margin:0 0 22px}.seo-prerender h2{font-size:28px;margin-top:54px}.seo-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:#6e716d}.seo-lede{font-size:20px;color:#555a56;max-width:760px}.seo-links,.seo-relations{padding-left:20px}.seo-object-list{list-style:none;padding:0;margin:34px 0}.seo-object-list li{border-top:1px solid #e2e1db}.seo-object-list a{display:grid;grid-template-columns:minmax(160px,1fr) 2fr;gap:24px;padding:20px 0;color:#202321}.seo-object-list span,.seo-relations span{display:block;color:#717570;font-size:14px}.seo-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 28px;margin:36px 0;border-top:1px solid #e2e1db}.seo-fields div{padding:12px 0;border-bottom:1px solid #e2e1db}.seo-fields dt{font-size:12px;color:#777b76;text-transform:uppercase}.seo-fields dd{margin:2px 0 0;overflow-wrap:anywhere}.seo-markdown img{max-width:100%;height:auto}.seo-markdown table{display:block;max-width:100%;overflow:auto;border-collapse:collapse}.seo-markdown th,.seo-markdown td{padding:8px 10px;border:1px solid #d9d8d1}.seo-markdown pre{overflow:auto;padding:16px;background:#f1f2ef}.seo-markdown blockquote{margin-left:0;padding-left:18px;border-left:2px solid #8bd4c8;color:#555a56}@media(max-width:700px){.seo-prerender{padding:18px 18px 56px}.seo-prerender header{align-items:flex-start;flex-direction:column;padding-bottom:24px}.seo-prerender main{padding-top:42px}.seo-prerender h1{font-size:40px}.seo-object-list a{grid-template-columns:1fr;gap:4px}.seo-fields{grid-template-columns:1fr}}
</style>`;

type DocumentOptions = {
  shell: string;
  title: string;
  description: string;
  canonicalPath: string;
  body: string;
  indexable: boolean;
  lang?: string;
  image?: string;
  type?: "website" | "article";
  structuredData?: unknown[];
};

export function renderDocument(options: DocumentOptions) {
  const canonical = absoluteURL(options.canonicalPath);
  const image = options.image || absoluteURL(seoConfig.site.default_image);
  const robots = options.indexable ? "index,follow,max-image-preview:large,max-snippet:-1" : "noindex,follow";
  const metadata = [
    `<meta name="description" content="${escapeHTML(options.description)}">`,
    `<meta name="robots" content="${robots}">`,
    ...(seoConfig.site.google_site_verification
      ? [`<meta name="google-site-verification" content="${escapeHTML(seoConfig.site.google_site_verification)}">`]
      : []),
    `<link rel="canonical" href="${escapeHTML(canonical)}">`,
    `<meta property="og:site_name" content="${escapeHTML(seoConfig.site.name)}">`,
    `<meta property="og:title" content="${escapeHTML(options.title)}">`,
    `<meta property="og:description" content="${escapeHTML(options.description)}">`,
    `<meta property="og:type" content="${options.type || "website"}">`,
    `<meta property="og:url" content="${escapeHTML(canonical)}">`,
    `<meta property="og:image" content="${escapeHTML(image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHTML(options.title)}">`,
    `<meta name="twitter:description" content="${escapeHTML(options.description)}">`,
    `<meta name="twitter:image" content="${escapeHTML(image)}">`,
    ...(options.structuredData || []).map((value) => `<script type="application/ld+json">${safeJSON(value)}</script>`),
    prerenderCSS
  ].join("\n");

  return options.shell
    .replace(/<html\b[^>]*\blang=["'][^"']*["']/i, `<html lang="${escapeHTML(options.lang || "en")}"`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHTML(options.title)}</title>`)
    .replace(/\s*<meta\s+(?:name=["'](?:description|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, "")
    .replace("</head>", `${metadata}\n</head>`)
    .replace(/<div\s+id=["']root["']>\s*<\/div>/i, `<div id="root">${options.body}</div>`);
}

export function homeStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${seoConfig.site.base_url}/#website`,
      url: seoConfig.site.base_url,
      name: seoConfig.site.name,
      alternateName: seoConfig.site.short_name,
      description: seoConfig.site.default_description,
      publisher: { "@id": `${seoConfig.site.base_url}/#organization` }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${seoConfig.site.base_url}/#organization`,
      name: seoConfig.site.name,
      url: seoConfig.site.base_url,
      sameAs: [seoConfig.site.github_url]
    }
  ];
}

export function objectStructuredData(object: SEOObject) {
  const canonical = absoluteURL(objectPath(object));
  const description = objectDescription(object);
  return [schemaForObject(object, canonical, description), breadcrumbSchema(object, canonical)];
}

export function collectionStructuredData(type: string, objects: SEOObject[]) {
  const route = routeForType(type);
  if (!route) return [];
  const canonical = absoluteURL(`/${route.collection}`);
  return [{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": canonical,
    name: route.label,
    url: canonical,
    isPartOf: { "@id": `${seoConfig.site.base_url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: objects.slice(0, 50).map((object, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: object.title,
        url: absoluteURL(objectPath(object))
      }))
    }
  }];
}
