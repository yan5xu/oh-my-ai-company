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

## Publication Boundary

The GitHub repository and the website are two read surfaces over the same public Vault.

- Every type, field, object, and Markdown body is published without a business-content allowlist.
- Every resolved `field` and body-mention link is preserved, so graph queries match the local Vault.
- Source quality and processing status remain visible as data instead of being used as hidden publication filters.
- Every local asset referenced by published Markdown is registered in D1 and served from R2.
- Sensitive patterns, missing bodies, missing assets, broken links, and source/projection count mismatches fail publication.

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

Upload allowlisted assets and remove non-public local assets from R2:

```bash
npm run assets:sync
```

Build and deploy the Worker and frontend:

```bash
npm run deploy
```

Run the complete pipeline:

```bash
npm run publish
```

`data:sync` replaces the complete read-only projection. The local Memex Vault remains authoritative; update `publish.manifest.json` only when publication-wide safety rules change.

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
```
