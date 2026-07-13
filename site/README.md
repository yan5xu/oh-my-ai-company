# Oh My AI Company Cloud Site

This directory publishes the local Memex vault as a read-only Cloudflare application.

Production URL: <https://companies.yan5xu.ai>

## Architecture

- The vault remains the source of truth: `.memex/memex.db`, `bodies/`, and `assets/`.
- `scripts/export-vault.mjs` translates SQLite objects, fields, links, and Markdown bodies into D1 SQL.
- D1 serves structured objects, Markdown bodies, links, and public search data.
- R2 serves vault images and other public media.
- A Cloudflare Worker exposes a narrow read-only API.
- React, TanStack Query/Table, Tailwind, shadcn-style primitives, and React Flow render the public UI.

The public Worker does not expose Memex's local `/api/run`, editing, uploads, or arbitrary SQL.

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
```

## Local Development

Run the Worker against the remote read-only data in one terminal:

```bash
npm run worker:dev
```

Run Vite in another terminal:

```bash
npm run dev
```

Open <http://127.0.0.1:5173>.

## Publish Updated Vault Data

Before publishing, refresh and validate the source vault:

```bash
mmx -C .. refresh
mmx -C .. issues
```

Export and replace the public D1 snapshot:

```bash
npm run data:sync
```

Upload assets:

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

`data:sync` intentionally replaces the public snapshot. The local Memex vault remains authoritative.

## Read-only API

```text
GET /api/health
GET /api/meta
GET /api/types
GET /api/objects?type=company&q=browser&limit=50&offset=0
GET /api/objects/:id
GET /api/graph?center=company.browserbase&depth=1
GET /media/assets/:path
```

Browser automation is available as `window.ohMyAI`:

```js
window.ohMyAI.state()
window.ohMyAI.selectType("investor")
window.ohMyAI.search("browser")
window.ohMyAI.openObject("company.browserbase")
window.ohMyAI.openGraph("company.browserbase")
window.ohMyAI.setGraphTypeVisible("source.item", true)
window.ohMyAI.setLanguage("en")
```
