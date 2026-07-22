# Oh My AI Company Cloud Site

This directory publishes a reviewed projection of the local Memex vault as a read-only Cloudflare application.

Production URL: <https://companies.yan5xu.ai>

## Architecture

- The vault remains the source of truth: `.memex/memex.db`, `bodies/`, and `assets/`.
- `publish.manifest.json` declares full-vault publication and the sensitive patterns that block a release.
- `scripts/export-vault.mjs` translates every type, field, object, Markdown body, resolved link, and referenced asset into the public projection.
- D1 serves structured objects, Markdown bodies, links, and public search data.
- R2 serves vault images and other public media.
- A Cloudflare Worker exposes the read-only subset of the Memex API protocol.
- `vendor/memex` pins the canonical Memex frontend as a Git submodule. The public site builds the same React, TanStack, shadcn-style, Markdown, and Graph workspace instead of maintaining a second UI.

The public Worker accepts read-only `/api/run` commands needed by the canonical UI. It rejects editing, uploads, and arbitrary SQL while exposing the complete public Vault for reading.

## Project Homepage

The homepage belongs to Oh My AI Company, not to Memex. Memex provides the build-time extension contract, shared React/TanStack/shadcn primitives, routing, and browser automation; this repository owns the page composition and editorial content.

```text
src/site-extension.tsx       # Registers the OMAC extension
src/home/HomePage.tsx        # Real homepage component and data queries
src/home/home-content.ts     # Chinese/English editorial copy and featured objects
src/home/home.css            # OMAC visual language and responsive layout
src/home/assets/             # Homepage-only bundled assets
```

`HomePage.tsx` reads the public D1 projection through `/api/meta` and `/api/objects`. Links enter the canonical Memex object, collection, and graph routes, so the homepage remains a project-owned introduction rather than a second application.

Use `npm run check` before committing homepage changes. `npm run build` type-checks both the Worker and extension, then builds the pinned Memex frontend with the OMAC extension.

## Publication Boundary

The GitHub repository and the website are two read surfaces over the same public Vault.

- Every type, field, object, and Markdown body is published without a business-content allowlist.
- Every resolved `field` and body-mention link is preserved, so graph queries match the local Vault.
- Source quality and processing status remain visible as data instead of being used as hidden publication filters.
- Every local asset referenced by published Markdown is registered in D1 and served from R2.
- Sensitive patterns, missing bodies, missing assets, broken links, and source/projection count mismatches fail publication.

## SEO Projection

Public availability and search indexing are separate policies. The site remains a full-vault public projection, while `seo.config.json` selects the pages that are substantial enough to enter search indexes.

- Company, investor, person, and concept pages require a minimum Markdown body length.
- Source pages additionally require usable quality, S1-S3 evidence, and a parsed/summarized/linked processing state.
- Notes, methods, touchpoints, investment events, traffic snapshots, Graph state, filters, and thin sources remain readable but return `noindex`.
- The export step converts Markdown into sanitized HTML, rewrites `[[object.id]]` links to canonical public URLs, and rewrites local images to R2 media URLs.
- The Worker returns the semantic body, unique metadata, canonical URL, Open Graph data, and JSON-LD in the initial HTML response. React then enhances the same route.
- Missing objects return a real `404`; legacy query-string object URLs permanently redirect to canonical paths.

Generated discovery files:

```text
/robots.txt
/sitemap.xml
/sitemaps/pages.xml
/sitemaps/companies.xml
/sitemaps/investors.xml
/sitemaps/people.xml
/sitemaps/concepts.xml
/sitemaps/sources.xml
```

After starting the local Worker, run the repeatable SEO smoke test:

```bash
npm run seo:verify -- http://127.0.0.1:8788
```

After deployment, run it against production:

```bash
npm run seo:verify -- https://companies.yan5xu.ai
```

Submit `https://companies.yan5xu.ai/sitemap.xml` in Google Search Console. Use URL Inspection on the homepage, one company, one investor, one indexed source, one `noindex` source, and one missing object after material routing changes.

## Cloudflare Resources

```text
Worker:  oh-my-ai-company
D1:      oh-my-ai-company-prod
R2:      oh-my-ai-company-assets
Domain:  companies.yan5xu.ai
```

The resource IDs and bindings are committed in `wrangler.jsonc`. Authentication remains local to Wrangler and is never committed.

## Requirements

- Node.js and npm
- `sqlite3` CLI
- Wrangler authenticated to the Cloudflare account that owns `yan5xu.ai`

Install dependencies:

```bash
cd site
npm install
git submodule update --init --recursive
```

## Local Development

Prepare the local D1 projection:

```bash
npm run publication:check
npx wrangler d1 migrations apply oh-my-ai-company-prod --local
npx wrangler d1 execute oh-my-ai-company-prod --local --file generated/vault.sql
```

Build the canonical Memex UI and start the local Worker:

```bash
npm run build
npm run dev
```

Open <http://127.0.0.1:8788>.

## Publish Updated Vault Data

Before publishing, refresh and validate the source vault:

```bash
mmx -C .. refresh
mmx -C .. issues
```

Validate the publication boundary:

```bash
npm run publication:check
```

Export, validate, and replace the public D1 projection:

```bash
npm run data:sync
```

Preview the R2 asset delta without writing production state:

```bash
npm run assets:dry-run
```

Add `-- --verbose` to print every planned object operation.

Upload only new or changed allowlisted assets, delete assets removed since the last successful sync, and publish the remote state manifest last:

```bash
npm run assets:sync
```

The first run after this incremental sync is introduced bootstraps the remote manifest and uploads the full allowlist once. Later runs compare SHA-256, size, content type, and cache policy against that manifest, so unchanged assets are skipped. If a PUT or DELETE fails, the remote manifest is not advanced and the next run safely retries the remaining delta.

Build and deploy the Worker and frontend:

```bash
npm run deploy
```

Run the complete pipeline:

```bash
npm run publish
```

`data:sync` replaces the complete read-only projection. The local Memex Vault remains authoritative; update `publish.manifest.json` only when publication-wide safety rules change.

The export also generates `generated/indexnow-manifest.json`. Each entry fingerprints the rendered body, structured fields, timestamps, and strong relations for one canonical page. After a successful publish, `indexnow:submit` compares that manifest with the previous per-URL state stored in D1 and notifies IndexNow only about added, changed, or removed URLs. Preview the pending notification without writing remote state:

```bash
npm run publication:check
npm run indexnow:dry-run
```

The IndexNow ownership key is served from the site root and intentionally carries `X-Robots-Tag: noindex, nofollow`. Keep `site.indexnow_key` stable; rotating it requires deploying the new key route before submitting URLs.

## Read-only API

```text
GET /api/health
GET /api/info
POST /api/run
GET /api/meta
GET /api/types
GET /api/objects?type=company&q=browser&limit=50&offset=0
GET /api/objects/:id
GET /api/graph?center=company.browserbase&depth=1
GET /media/assets/:path
```

The public UI exposes the same browser automation API as Memex:

```js
window.memex.state()
window.memex.selectType("investor")
window.memex.setFilter("browser")
window.memex.openObject("company.browserbase")
window.memex.openGraph()
window.memex.graphWorkspace.setView("portfolio")
window.memex.graphWorkspace.setCenter("investor.lightspeed-venture-partners")
window.memex.setLanguage("en")
window.memex.openHome()
window.memex.site.state()
window.memex.site.invoke("setSearch", "Kernel")
window.memex.site.invoke("setLanguage", "zh")
```
