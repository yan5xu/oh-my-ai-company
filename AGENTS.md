# AGENTS.md

This repository is a Memex research vault. It is meant to be used by agents through the `mmx` CLI, not by editing the SQLite database directly.

## Identity

You are working inside the AI company research vault.

Your job is to read, write, and maintain structured research assets:

- companies and products
- people and founders
- investors and investments
- source evidence
- touchpoints for monitoring
- traffic snapshots
- notes, concepts, and methods
- images and other research assets

Facts must come from captured sources. Do not invent facts. If a page cannot be read or only returns navigation/cookie/empty content, mark it as failed or partial and do not use it as evidence.

Boundary: this vault stores company research assets, not social media operations assets. Social/community content can be saved as `source.item` only when it is evidence for a company/product/person/investor research question. Do not create `social.account`, `social.post`, or `social.analytics.snapshot` objects in this vault.

## Required Tooling

Memex product repo:

```text
https://github.com/yan5xu/memex
```

Use the `mmx` CLI from Memex. If you built Memex locally, either put `mmx` on `PATH` or set `MMX` to your local binary path.

```bash
MMX=mmx
```

Use the repository root as the vault path:

```bash
cd /path/to/ai-company-research-vault
VAULT=$(pwd)
```

Always run commands with `-C "$VAULT"` unless your current working directory is definitely the vault root.

## First Commands

Run these before doing meaningful work:

```bash
MMX=mmx
VAULT=$(pwd)

$MMX --help
$MMX -C "$VAULT" vault info
$MMX -C "$VAULT" status
$MMX -C "$VAULT" issues
```

Expected health check:

```text
issues count = 0
```

If `issues` is nonzero, inspect and fix the issue before writing new research unless the user explicitly asks otherwise.

## Storage Model

Memex stores:

- `.memex/memex.db` for types, fields, objects, and links.
- `bodies/*.md` for long-form Markdown body content.
- `assets/` for screenshots, product images, diagrams, and source media.
- `memex.graph-views.json` for Graph v2 views.

Do not edit `.memex/memex.db` manually.

Use `mmx` commands for object fields and links. Markdown bodies can be edited directly, but after direct edits run:

```bash
$MMX -C "$VAULT" body refresh <object-id>
```

## Read Workflow

Check schema:

```bash
$MMX -C "$VAULT" type list
$MMX -C "$VAULT" field list company
$MMX -C "$VAULT" field list source.item
$MMX -C "$VAULT" field list note
```

Find objects:

```bash
$MMX -C "$VAULT" query company --where 'title=Browserless' --select id,title,website,tags
$MMX -C "$VAULT" query source.item --where 'about_company=company.browserless' --select id,title,platform,evidence_level,quality
```

Read object:

```bash
$MMX -C "$VAULT" get company.browserless --body-preview 800
$MMX -C "$VAULT" links company.browserless
$MMX -C "$VAULT" backlinks company.browserless
```

## Write Workflow

Prefer `upsert` for objects and `source add` for evidence. Use `--body-stdin` for substantial body content.

Create or update company:

```bash
cat <<'EOF' | $MMX -C "$VAULT" upsert company company.example \
  name="Example" \
  title="Example" \
  status=active \
  website="https://example.com" \
  tags=ai-agent,developer-tool \
  --body-stdin
# Example

Write the company dossier here. Keep facts and judgments separate.
EOF
```

Add source evidence:

```bash
cat <<'EOF' | $MMX -C "$VAULT" source add source.example-home \
  --title "Example homepage" \
  --url "https://example.com" \
  platform=Website \
  item_type=profile \
  evidence_level=S1 \
  quality=full \
  about_company=company.example \
  --body-stdin
Summarize the source, capture key facts, and state evidence boundaries.
EOF
```

Add a human judgment note:

```bash
cat <<'EOF' | $MMX -C "$VAULT" upsert note note.example-takeaway \
  title="Example product takeaway" \
  kind=takeaway \
  author=researcher \
  about_company=company.example \
  created_at=2026-07-13 \
  --body-stdin
Write analysis, takeaway, question, decision, or reflection here.
EOF
```

Create strong links:

```bash
$MMX -C "$VAULT" link company.example founders person.example-founder
$MMX -C "$VAULT" link source.example-home about_company company.example
```

Markdown body links use `[[object.id]]`. After writing Markdown links:

```bash
$MMX -C "$VAULT" body refresh <object-id>
```

## Core Types

High-frequency types:

- `company`: company/product subject.
- `person`: founder, investor, operator, observer.
- `investor`: venture firm, angel, accelerator, strategic investor.
- `investment`: investor-company funding relation.
- `source.item`: one source/evidence item.
- `touchpoint`: durable monitoring entry such as website, X account, GitHub repo, Product Hunt page, LinkedIn page, search query.
- `traffic.snapshot`: Similarweb/Semrush/Google Trends/GA/GSC traffic record.
- `note`: human judgment, takeaway, question, decision, reflection.
- `concept`: reusable concept or market/product/GTM pattern.
- `method`: research or tooling method.

Do not use `touchpoint` for one-off articles. One-off articles belong in `source.item`.

## Evidence Rules

Evidence levels:

- `S1`: official or primary source.
- `S2`: strong third-party source.
- `S3`: community or weak signal.
- `S4`: unverified, failed, empty, or uncertain.

Quality values commonly used:

- `full`: substantive content captured.
- `partial`: usable but incomplete.
- `metadata_only`: only metadata captured.
- `empty_shell`: cookie/nav/empty content; do not use for conclusions.

If browser read returns cookie banners, nav-only text, or less than substantive body content, mark source as `partial`, `metadata_only`, or `empty_shell` and explain the limitation in the body.

## Graph Views

Graph configuration:

```text
memex.graph-views.json
```

Useful views:

```bash
$MMX -C "$VAULT" graph view list
$MMX -C "$VAULT" graph query --view company-research-map --center company.browserless
$MMX -C "$VAULT" graph query --view company-evidence --center company.browserless
$MMX -C "$VAULT" graph query --view company-traffic --center company.browserless
$MMX -C "$VAULT" graph query --view portfolio --center investor.lightspeed-venture-partners
$MMX -C "$VAULT" graph query --view person-network --center person.joel-griffith
$MMX -C "$VAULT" graph query --view source-trail --center source.similarweb.browserless-2026-01-2026-06
```

Before changing graph views:

```bash
$MMX -C "$VAULT" graph view validate --file memex.graph-views.json
$MMX -C "$VAULT" graph view apply --file memex.graph-views.json
```

## Web UI

Start UI:

```bash
$MMX -C "$VAULT" serve --addr 127.0.0.1:8765
```

Open:

```text
http://127.0.0.1:8765
```

Web automation global:

```js
window.memex
```

## End-of-Turn Checklist

Before finishing a research or maintenance task:

```bash
$MMX -C "$VAULT" issues
git status -sb
git diff --stat
```

If you changed vault contents:

```bash
git add <changed-files>
git commit -m "<concise message>"
git push
```

Never commit unrelated user changes. If the worktree is mixed, inspect carefully and stage only the files you changed.
