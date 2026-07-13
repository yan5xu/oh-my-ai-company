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
    description: "A living atlas of AI companies, founders, investors, evidence, and research notes.",
    generated_at: meta.generated_at || null,
    object_count: Number(meta.object_count || 0),
    link_count: Number(meta.link_count || 0),
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
    const active = frontier.slice(0, 75);
    const placeholders = active.map(() => "?").join(",");
    const result = await env.DB.prepare(`
      SELECT id, from_object_id, to_object_id, kind, relation
      FROM links
      WHERE from_object_id IN (${placeholders}) OR to_object_id IN (${placeholders})
      LIMIT 500
    `).bind(...active, ...active).all<Record<string, unknown>>();
    const next: string[] = [];
    for (const edge of result.results || []) {
      edgeMap.set(Number(edge.id), edge);
      for (const id of [String(edge.from_object_id), String(edge.to_object_id)]) {
        if (!seen.has(id) && seen.size < 150) {
          seen.add(id);
          next.push(id);
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

async function serveMedia(request: Request, env: Env) {
  const url = new URL(request.url);
  const key = decodeURIComponent(url.pathname.slice("/media/".length));
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });
  const object = await env.MEDIA.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", object.httpMetadata?.cacheControl || "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
}

async function api(request: Request, env: Env) {
  const url = new URL(request.url);
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
