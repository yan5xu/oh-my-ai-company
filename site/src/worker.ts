interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  ASSETS: Fetcher;
}

type ObjectRow = {
  id: string;
  type_id: string;
  title: string;
  body?: string;
  body_path?: string;
  fields_json: string;
  created_at: string;
  updated_at: string;
};

type LinkRow = {
  id: number;
  from_object_id: string;
  to_object_id: string;
  kind: string;
  relation: string;
  line: number;
  text: string;
  resolved: number;
};

type GraphViewStep = { relation: string; direction: "in" | "out"; target_type: string };
type GraphNodeTemplate = { variant?: string; title_field?: string; subtitle_field?: string; meta_fields?: string[]; badge_fields?: string[]; image_field?: string };
type GraphBridgeConfig = { label_fields?: string[]; aggregate?: boolean };
type GraphView = {
  id: string;
  label: string;
  root_type: string;
  description?: string;
  paths?: Array<{ steps: GraphViewStep[] }>;
  nodes?: Record<string, GraphNodeTemplate>;
  bridges?: Record<string, GraphBridgeConfig>;
};
type GraphViewConfig = { version: number; views: GraphView[] };

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "x-content-type-options": "nosniff"
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...jsonHeaders, ...init.headers }
  });
}

function parseFields(row: ObjectRow) {
  let fields: Record<string, unknown> = {};
  try {
    fields = JSON.parse(row.fields_json || "{}");
  } catch {
    fields = {};
  }
  const { fields_json: _fieldsJSON, ...rest } = row;
  return { ...rest, fields };
}

function memexObject(row: ObjectRow) {
  return {
    ...parseFields(row),
    body_path: row.body_path || "",
    body_abs_path: ""
  };
}

function memexLink(row: LinkRow) {
  return {
    id: row.id,
    from_id: row.from_object_id,
    to_id: row.to_object_id,
    kind: row.kind,
    relation: row.relation,
    line: row.line || 0,
    text: row.text || "",
    resolved: Boolean(row.resolved)
  };
}

function runOK(data: unknown) {
  return json({ ok: true, code: 0, data });
}

function runError(message: string, kind = "invalid_arguments", code = 2) {
  return json({ ok: false, code, error: { kind, message } });
}

function integer(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

async function metadata(env: Env) {
  const [values, types] = await Promise.all([
    env.DB.prepare("SELECT key, value FROM metadata").all<{ key: string; value: string }>(),
    env.DB.prepare("SELECT COUNT(*) AS count FROM types").first<{ count: number }>()
  ]);
  const meta = Object.fromEntries((values.results || []).map((row) => [row.key, row.value]));
  return {
    name: "Oh My AI Company",
    description: "A curated atlas of AI companies, founders, investors, evidence, and market signals.",
    generated_at: meta.generated_at || null,
    object_count: Number(meta.object_count || 0),
    link_count: Number(meta.link_count || 0),
    company_count: Number(meta.company_count || 0),
    asset_count: Number(meta.asset_count || 0),
    publication_manifest_version: Number(meta.publication_manifest_version || 0),
    type_count: Number(types?.count || 0)
  };
}

async function listTypes(env: Env) {
  const result = await env.DB.prepare(`
    SELECT t.id, t.name, t.description, COUNT(o.id) AS object_count
    FROM types t
    LEFT JOIN objects o ON o.type_id = t.id
    GROUP BY t.id, t.name, t.description
    ORDER BY CASE t.id
      WHEN 'company' THEN 0 WHEN 'investor' THEN 1 WHEN 'person' THEN 2
      WHEN 'concept' THEN 3 WHEN 'source.item' THEN 4 ELSE 10 END,
      t.id
  `).all();
  return result.results || [];
}

async function listObjects(request: Request, env: Env) {
  const url = new URL(request.url);
  const type = (url.searchParams.get("type") || "company").trim();
  const q = (url.searchParams.get("q") || "").trim();
  const limit = integer(url.searchParams.get("limit"), 50, 1, 100);
  const offset = integer(url.searchParams.get("offset"), 0, 0, 100000);
  const conditions = ["o.type_id = ?"];
  const values: unknown[] = [type];

  if (q) {
    conditions.push("(o.title LIKE ? OR o.id LIKE ? OR o.fields_json LIKE ?)");
    const pattern = `%${q}%`;
    values.push(pattern, pattern, pattern);
  }

  const where = conditions.join(" AND ");
  const [rows, count] = await Promise.all([
    env.DB.prepare(`
      SELECT o.id, o.type_id, o.title, o.body_path, o.fields_json, o.created_at, o.updated_at
      FROM objects o
      WHERE ${where}
      ORDER BY o.title COLLATE NOCASE, o.id
      LIMIT ? OFFSET ?
    `).bind(...values, limit, offset).all<ObjectRow>(),
    env.DB.prepare(`SELECT COUNT(*) AS count FROM objects o WHERE ${where}`)
      .bind(...values).first<{ count: number }>()
  ]);

  return {
    items: (rows.results || []).map(parseFields),
    total: Number(count?.count || 0),
    limit,
    offset
  };
}

async function getObject(id: string, env: Env) {
  const row = await env.DB.prepare(`
    SELECT id, type_id, title, body, body_path, fields_json, created_at, updated_at
    FROM objects WHERE id = ?
  `).bind(id).first<ObjectRow>();
  if (!row) return null;

  const [outgoing, incoming] = await Promise.all([
    env.DB.prepare(`
      SELECT l.id, l.kind, l.relation, l.line, l.text,
        l.to_object_id AS object_id, o.title, o.type_id
      FROM links l JOIN objects o ON o.id = l.to_object_id
      WHERE l.from_object_id = ?
      ORDER BY l.kind, l.relation, o.title
    `).bind(id).all(),
    env.DB.prepare(`
      SELECT l.id, l.kind, l.relation, l.line, l.text,
        l.from_object_id AS object_id, o.title, o.type_id
      FROM links l JOIN objects o ON o.id = l.from_object_id
      WHERE l.to_object_id = ?
      ORDER BY l.kind, l.relation, o.title
    `).bind(id).all()
  ]);

  return {
    object: parseFields(row),
    links: outgoing.results || [],
    backlinks: incoming.results || []
  };
}

async function graph(request: Request, env: Env) {
  const url = new URL(request.url);
  const center = (url.searchParams.get("center") || "").trim();
  const depth = integer(url.searchParams.get("depth"), 1, 1, 2);
  if (!center) return { center: null, nodes: [], edges: [] };

  const seen = new Set([center]);
  let frontier = [center];
  const edgeMap = new Map<number, Record<string, unknown>>();

  for (let level = 0; level < depth && frontier.length > 0 && seen.size < 150; level += 1) {
    const next: string[] = [];
    const active = frontier.slice(0, 120);
    for (let start = 0; start < active.length && seen.size < 150; start += 40) {
      const batch = active.slice(start, start + 40);
      const placeholders = batch.map(() => "?").join(",");
      const result = await env.DB.prepare(`
        SELECT id, from_object_id, to_object_id, kind, relation
        FROM links
        WHERE from_object_id IN (${placeholders}) OR to_object_id IN (${placeholders})
        LIMIT 500
      `).bind(...batch, ...batch).all<Record<string, unknown>>();
      for (const edge of result.results || []) {
        edgeMap.set(Number(edge.id), edge);
        for (const id of [String(edge.from_object_id), String(edge.to_object_id)]) {
          if (!seen.has(id) && seen.size < 150) {
            seen.add(id);
            next.push(id);
          }
        }
      }
    }
    frontier = next;
  }

  const ids = [...seen];
  const placeholders = ids.map(() => "?").join(",");
  const rows = await env.DB.prepare(`
    SELECT id, type_id, title, fields_json, created_at, updated_at
    FROM objects WHERE id IN (${placeholders})
  `).bind(...ids).all<ObjectRow>();

  return {
    center,
    nodes: (rows.results || []).map(parseFields),
    edges: [...edgeMap.values()]
  };
}

async function metadataValue<T>(env: Env, key: string, fallback: T): Promise<T> {
  const row = await env.DB.prepare("SELECT value FROM metadata WHERE key = ?").bind(key).first<{ value: string }>();
  if (!row?.value) return fallback;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}

function argumentValue(argv: string[], flag: string, fallback = "") {
  const index = argv.indexOf(flag);
  return index >= 0 && index + 1 < argv.length ? argv[index + 1] : fallback;
}

function cleanFilterValue(raw: string) {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    try { return JSON.parse(value); } catch { return value.slice(1, -1); }
  }
  if (value.startsWith("'") && value.endsWith("'")) return value.slice(1, -1).replaceAll("\\'", "'");
  return value;
}

function parseWhere(expression: string) {
  const value = expression.trim();
  for (const operator of [" contains ", "!=", "="]) {
    const index = value.indexOf(operator);
    if (index <= 0) continue;
    return {
      field: value.slice(0, index).trim(),
      operator: operator.trim(),
      value: cleanFilterValue(value.slice(index + operator.length))
    };
  }
  return null;
}

function rowMatchesWhere(row: ReturnType<typeof memexObject>, expression: string) {
  if (!expression.trim()) return true;
  const parsed = parseWhere(expression);
  if (!parsed) return false;
  const actual = parsed.field === "id" || parsed.field === "title"
    ? row[parsed.field]
    : row.fields[parsed.field];
  const items = Array.isArray(actual) ? actual : [actual];
  if (parsed.operator === "contains") {
    const needle = String(parsed.value).toLowerCase();
    return items.some((item) => String(item ?? "").toLowerCase().includes(needle));
  }
  const equal = items.some((item) => String(item ?? "") === String(parsed.value));
  return parsed.operator === "!=" ? !equal : equal;
}

async function allMemexObjects(env: Env) {
  const rows = await env.DB.prepare(`
    SELECT id, type_id, title, body_path, fields_json, created_at, updated_at
    FROM objects ORDER BY id
  `).all<ObjectRow>();
  return (rows.results || []).map(memexObject);
}

async function allMemexLinks(env: Env) {
  const rows = await env.DB.prepare(`
    SELECT id, from_object_id, to_object_id, kind, relation, line, text, resolved
    FROM links ORDER BY id
  `).all<LinkRow>();
  return (rows.results || []).map(memexLink);
}

async function getMemexObject(id: string, env: Env) {
  const row = await env.DB.prepare(`
    SELECT id, type_id, title, body, body_path, fields_json, created_at, updated_at
    FROM objects WHERE id = ?
  `).bind(id).first<ObjectRow>();
  if (!row) return null;
  const [links, backlinks] = await Promise.all([
    env.DB.prepare(`
      SELECT id, from_object_id, to_object_id, kind, relation, line, text, resolved
      FROM links WHERE from_object_id = ? ORDER BY kind, relation, to_object_id
    `).bind(id).all<LinkRow>(),
    env.DB.prepare(`
      SELECT id, from_object_id, to_object_id, kind, relation, line, text, resolved
      FROM links WHERE to_object_id = ? ORDER BY kind, relation, from_object_id
    `).bind(id).all<LinkRow>()
  ]);
  return {
    object: memexObject(row),
    body: row.body || "",
    links: (links.results || []).map(memexLink),
    backlinks: (backlinks.results || []).map(memexLink)
  };
}

function graphFieldValue(object: ReturnType<typeof memexObject>, field: string | undefined) {
  if (!field) return undefined;
  if (field === "id" || field === "title") return object[field];
  return object.fields[field];
}

function graphDisplayValue(value: unknown) {
  if (value === undefined || value === null || value === "") return "";
  return Array.isArray(value) ? value.map(String).join(", ") : String(value);
}

function graphNodeDisplay(object: ReturnType<typeof memexObject>, template: GraphNodeTemplate = {}) {
  const meta = (template.meta_fields || []).flatMap((field) => {
    const value = graphDisplayValue(graphFieldValue(object, field));
    return value ? [{ field, value }] : [];
  });
  const badges = (template.badge_fields || []).flatMap((field) => {
    const value = graphDisplayValue(graphFieldValue(object, field));
    return value ? [{ field, value }] : [];
  });
  const subtitle = graphDisplayValue(graphFieldValue(object, template.subtitle_field));
  const image = graphDisplayValue(graphFieldValue(object, template.image_field));
  return {
    variant: template.variant || "standard",
    title: graphDisplayValue(graphFieldValue(object, template.title_field || "title")) || object.title || object.id,
    ...(subtitle ? { subtitle } : {}),
    ...(meta.length ? { meta } : {}),
    ...(badges.length ? { badges } : {}),
    ...(image ? { image } : {})
  };
}

function projectedGraph(view: GraphView, centerID: string, objects: ReturnType<typeof memexObject>[], links: ReturnType<typeof memexLink>[]) {
  const objectByID = new Map(objects.map((object) => [object.id, object]));
  const center = objectByID.get(centerID);
  if (!center) throw new Error(`object not found: ${centerID}`);
  if (center.type_id !== view.root_type) throw new Error(`center ${centerID} is ${center.type_id}, expected ${view.root_type}`);

  const depths = new Map<string, number>([[centerID, 0]]);
  const selectedEdges = new Map<number, ReturnType<typeof memexLink>>();
  for (const path of view.paths || []) {
    let frontier = new Set([centerID]);
    for (let index = 0; index < (path.steps || []).length; index += 1) {
      const step = path.steps[index];
      const next = new Set<string>();
      for (const link of links) {
        if (link.kind !== "field" || link.relation !== step.relation) continue;
        const sourceID = step.direction === "out" ? link.from_id : link.to_id;
        const targetID = step.direction === "out" ? link.to_id : link.from_id;
        if (!frontier.has(sourceID)) continue;
        const target = objectByID.get(targetID);
        if (!target || target.type_id !== step.target_type) continue;
        next.add(targetID);
        selectedEdges.set(link.id, link);
        const depth = index + 1;
        depths.set(targetID, Math.min(depths.get(targetID) ?? depth, depth));
      }
      frontier = next;
    }
  }

  const bridgeTypes = new Set(Object.keys(view.bridges || {}));
  const projectedEdges: Array<Record<string, unknown>> = [];
  const consumedEdgeIDs = new Set<number>();
  const derivedByKey = new Map<string, Record<string, unknown>>();
  for (const bridgeID of [...depths.keys()].filter((id) => bridgeTypes.has(objectByID.get(id)?.type_id || ""))) {
    const bridge = objectByID.get(bridgeID)!;
    const neighbors = [...selectedEdges.values()].flatMap((edge) => {
      if (edge.from_id === bridgeID) return [{ id: edge.to_id, edge }];
      if (edge.to_id === bridgeID) return [{ id: edge.from_id, edge }];
      return [];
    }).filter((entry) => depths.has(entry.id) && !bridgeTypes.has(objectByID.get(entry.id)?.type_id || ""));
    for (let left = 0; left < neighbors.length; left += 1) {
      for (let right = left + 1; right < neighbors.length; right += 1) {
        const a = neighbors[left];
        const b = neighbors[right];
        const aDepth = depths.get(a.id) ?? 0;
        const bDepth = depths.get(b.id) ?? 0;
        const [fromID, toID, relation] = aDepth <= bDepth
          ? [a.id, b.id, b.edge.relation]
          : [b.id, a.id, a.edge.relation];
        const bridgeConfig = view.bridges?.[bridge.type_id] || {};
        const label = (bridgeConfig.label_fields || []).map((field) => graphDisplayValue(graphFieldValue(bridge, field))).filter(Boolean).join(" · ");
        const key = `${fromID}\u0000${toID}\u0000${relation}`;
        const current = derivedByKey.get(key);
        const detail = { id: bridge.id, type_id: bridge.type_id, title: bridge.title, fields: bridge.fields };
        if (current && bridgeConfig.aggregate !== false) {
          current.count = Number(current.count) + 1;
          current.via_ids = [...(current.via_ids as string[]), bridge.id];
          current.via = [...(current.via as unknown[]), detail];
          if (label) current.label = [String(current.label || ""), label].filter(Boolean).join(" | ");
        } else {
          derivedByKey.set(key, {
            from_id: fromID,
            to_id: toID,
            kind: "field",
            relation,
            ...(label ? { label } : {}),
            count: 1,
            derived: true,
            via_ids: [bridge.id],
            via: [detail],
            relations: [a.edge.relation, b.edge.relation]
          });
        }
        consumedEdgeIDs.add(a.edge.id);
        consumedEdgeIDs.add(b.edge.id);
      }
    }
  }

  for (const edge of selectedEdges.values()) {
    if (consumedEdgeIDs.has(edge.id)) continue;
    if (bridgeTypes.has(objectByID.get(edge.from_id)?.type_id || "") || bridgeTypes.has(objectByID.get(edge.to_id)?.type_id || "")) continue;
    projectedEdges.push({
      from_id: edge.from_id,
      to_id: edge.to_id,
      kind: edge.kind,
      relation: edge.relation,
      count: 1,
      derived: false
    });
  }
  projectedEdges.push(...derivedByKey.values());

  const nodes = [...depths.entries()].flatMap(([id, depth]) => {
    const object = objectByID.get(id);
    if (!object || bridgeTypes.has(object.type_id)) return [];
    return [{
      id: object.id,
      type_id: object.type_id,
      title: object.title,
      fields: object.fields,
      depth,
      display: graphNodeDisplay(object, view.nodes?.[object.type_id])
    }];
  });
  return {
    view,
    center: centerID,
    nodes,
    edges: projectedEdges,
    stats: {
      nodes: nodes.length,
      edges: projectedEdges.length,
      derived_edges: projectedEdges.filter((edge) => edge.derived).length
    }
  };
}

async function handleRun(request: Request, env: Env) {
  let payload: { argv?: unknown; vault?: unknown };
  try {
    payload = await request.json();
  } catch {
    return runError("invalid JSON body");
  }
  const argv = Array.isArray(payload.argv) ? payload.argv.map(String) : [];
  if (argv.length === 0) return runError("missing argv");

  if (argv[0] === "vault" && argv[1] === "info") {
    return runOK({ exists: true, root: "public", db_path: "cloudflare:d1" });
  }
  if (argv[0] === "issues") return runOK({ count: 0, issues: [] });
  if (argv[0] === "type" && argv[1] === "list") {
    const types = await metadataValue<unknown[]>(env, "type_definitions", []);
    return runOK({ types });
  }
  if (argv[0] === "query" && argv[1]) {
    const limit = Math.min(200, Math.max(1, Number.parseInt(argumentValue(argv, "--limit", "200"), 10) || 200));
    const where = argumentValue(argv, "--where");
    const rows = await env.DB.prepare(`
      SELECT id, type_id, title, body_path, fields_json, created_at, updated_at
      FROM objects WHERE type_id = ? ORDER BY title COLLATE NOCASE, id LIMIT 200
    `).bind(argv[1]).all<ObjectRow>();
    const result = (rows.results || []).map(memexObject).filter((row) => rowMatchesWhere(row, where)).slice(0, limit).map((row) => ({ id: row.id, title: row.title, ...row.fields }));
    return runOK({ rows: result });
  }
  if (argv[0] === "object" && argv[1] === "get" && argv[2]) {
    const object = await getMemexObject(argv[2], env);
    return object ? runOK(object) : runError(`object not found: ${argv[2]}`, "not_found", 1);
  }
  if (argv[0] === "graph" && argv[1] === "export") {
    const [nodes, edges] = await Promise.all([allMemexObjects(env), allMemexLinks(env)]);
    return runOK({ nodes, edges });
  }
  if (argv[0] === "graph" && argv[1] === "views") {
    const config = await metadataValue<GraphViewConfig>(env, "graph_views", { version: 2, views: [] });
    return runOK(config);
  }
  if (argv[0] === "graph" && argv[1] === "query") {
    const viewID = argumentValue(argv, "--view");
    const centerID = argumentValue(argv, "--center");
    const config = await metadataValue<GraphViewConfig>(env, "graph_views", { version: 2, views: [] });
    const view = config.views.find((candidate) => candidate.id === viewID);
    if (!view) return runError(`unknown graph view: ${viewID}`, "not_found", 1);
    try {
      const [objects, links] = await Promise.all([allMemexObjects(env), allMemexLinks(env)]);
      return runOK(projectedGraph(view, centerID, objects, links));
    } catch (error) {
      return runError(error instanceof Error ? error.message : String(error));
    }
  }
  return runError(`command is unavailable in the public read-only site: ${argv.join(" ")}`, "read_only", 1);
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

async function serveMediaKey(key: string, env: Env) {
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });
  const published = await env.DB.prepare("SELECT path, content_type FROM public_assets WHERE path = ?")
    .bind(key).first<{ path: string; content_type: string }>();
  if (!published) return new Response("Not found", { status: 404 });
  const object = await env.MEDIA.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("content-type", published.content_type);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", object.httpMetadata?.cacheControl || "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

async function serveMedia(request: Request, env: Env) {
  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.slice("/media/".length));
  return serveMediaKey(key, env);
}

async function api(request: Request, env: Env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/info" && request.method === "GET") {
    return runOK({
      product: "Oh My AI Company",
      default_vault: "public",
      vault_exists: true,
      showcase_vault: "",
      showcase_exists: false,
      showcase_start_object: "",
      read_only: true,
      brand_name: "Oh My AI Company",
      brand_mark: "OM",
      brand_tagline: "AI company research atlas",
      source_url: "https://github.com/yan5xu/oh-my-ai-company",
      status_label: "Public · Read-only"
    });
  }
  if (url.pathname === "/api/run" && request.method === "POST") return handleRun(request, env);
  if (url.pathname === "/api/file" && request.method === "GET") {
    const key = normalizeAssetPath(url.searchParams.get("path") || "", url.searchParams.get("base") || "");
    return serveMediaKey(key, env);
  }
  if (request.method !== "GET") return json({ error: "read-only API" }, { status: 405 });

  if (url.pathname === "/api/health") {
    const value = await env.DB.prepare("SELECT 1 AS ok").first();
    return json({ ok: value?.ok === 1 }, { headers: { "cache-control": "no-store" } });
  }
  if (url.pathname === "/api/meta") {
    return json(await metadata(env), { headers: { "cache-control": "public, max-age=60" } });
  }
  if (url.pathname === "/api/types") {
    return json(await listTypes(env), { headers: { "cache-control": "public, max-age=300" } });
  }
  if (url.pathname === "/api/objects") {
    return json(await listObjects(request, env), { headers: { "cache-control": "public, max-age=60" } });
  }
  if (url.pathname.startsWith("/api/objects/")) {
    const id = decodeURIComponent(url.pathname.slice("/api/objects/".length));
    const value = await getObject(id, env);
    return value ? json(value, { headers: { "cache-control": "public, max-age=300" } }) : json({ error: "object not found" }, { status: 404 });
  }
  if (url.pathname === "/api/graph") {
    return json(await graph(request, env), { headers: { "cache-control": "public, max-age=120" } });
  }
  return json({ error: "not found" }, { status: 404 });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return await api(request, env);
      if (url.pathname.startsWith("/media/")) return await serveMedia(request, env);
      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);
      return json({ error: "internal error" }, { status: 500 });
    }
  }
} satisfies ExportedHandler<Env>;
