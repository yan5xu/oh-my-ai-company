import {
  absoluteURL,
  appSEOBody,
  collectionIsIndexable,
  collectionSEOBody,
  collectionStructuredData,
  escapeXML,
  firstObjectImage,
  homeSEOBody,
  homeStructuredData,
  isObjectIndexable,
  notFoundSEOBody,
  objectDescription,
  objectIDFromPath,
  objectPageTitle,
  objectPath,
  objectSEOBody,
  objectStructuredData,
  pageLanguage,
  renderDocument,
  routeForCollection,
  routeForType,
  seoConfig,
  type SEOObject,
  type SEORelation
} from "./seo";

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
  body_html?: string;
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
    description: "A complete public Memex vault of AI companies, founders, investors, evidence, and market signals.",
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
  const orderValues: unknown[] = [];
  let relevanceOrder = "";

  if (q) {
    conditions.push("(o.title LIKE ? OR o.id LIKE ? OR o.fields_json LIKE ?)");
    const pattern = `%${q}%`;
    values.push(pattern, pattern, pattern);
    relevanceOrder = `
      CASE
        WHEN o.title = ? COLLATE NOCASE THEN 0
        WHEN o.title LIKE ? COLLATE NOCASE THEN 1
        WHEN o.id LIKE ? COLLATE NOCASE THEN 2
        WHEN o.title LIKE ? COLLATE NOCASE THEN 3
        ELSE 4
      END,`;
    orderValues.push(q, `${q}%`, `%.${q}%`, pattern);
  }

  const where = conditions.join(" AND ");
  const [rows, count] = await Promise.all([
    env.DB.prepare(`
      SELECT o.id, o.type_id, o.title, o.body_path, o.fields_json, o.created_at, o.updated_at
      FROM objects o
      WHERE ${where}
      ORDER BY ${relevanceOrder} o.title COLLATE NOCASE, o.id
      LIMIT ? OFFSET ?
    `).bind(...values, ...orderValues, limit, offset).all<ObjectRow>(),
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

async function getSEOObject(id: string, env: Env) {
  return env.DB.prepare(`
    SELECT id, type_id, title, body, body_html, body_path, fields_json, created_at, updated_at
    FROM objects WHERE id = ?
  `).bind(id).first<SEOObject>();
}

async function getSEOCollection(type: string, env: Env) {
  const rows = await env.DB.prepare(`
    SELECT id, type_id, title, body, body_html, body_path, fields_json, created_at, updated_at
    FROM objects WHERE type_id = ?
    ORDER BY title COLLATE NOCASE, id
    LIMIT 1000
  `).bind(type).all<SEOObject>();
  const objects = rows.results || [];
  return (collectionIsIndexable(type) ? objects.filter(isObjectIndexable) : objects).slice(0, 120);
}

async function getSEORelations(id: string, env: Env) {
  const [outgoing, incoming] = await Promise.all([
    env.DB.prepare(`
      SELECT o.id AS object_id, o.title, o.type_id, l.relation
      FROM links l JOIN objects o ON o.id = l.to_object_id
      WHERE l.from_object_id = ? AND l.kind = 'field'
      ORDER BY l.relation, o.title COLLATE NOCASE
      LIMIT 80
    `).bind(id).all<Omit<SEORelation, "direction">>(),
    env.DB.prepare(`
      SELECT o.id AS object_id, o.title, o.type_id, l.relation
      FROM links l JOIN objects o ON o.id = l.from_object_id
      WHERE l.to_object_id = ? AND l.kind = 'field'
      ORDER BY l.relation, o.title COLLATE NOCASE
      LIMIT 80
    `).bind(id).all<Omit<SEORelation, "direction">>()
  ]);
  return [
    ...(outgoing.results || []).map((row) => ({ ...row, direction: "out" as const })),
    ...(incoming.results || []).map((row) => ({ ...row, direction: "in" as const }))
  ].slice(0, 120);
}

async function appShell(request: Request, env: Env) {
  const url = new URL("/", request.url);
  const response = await env.ASSETS.fetch(new Request(url, { method: "GET", headers: request.headers }));
  if (!response.ok) throw new Error(`app shell unavailable: ${response.status}`);
  return response.text();
}

async function htmlPage(
  request: Request,
  env: Env,
  options: Parameters<typeof renderDocument>[0],
  status = 200
) {
  const body = renderDocument({ ...options, shell: await appShell(request, env) });
  const headers = new Headers({
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "x-robots-tag": options.indexable ? "index, follow" : "noindex, follow",
    "cache-control": status === 200
      ? "public, max-age=0, s-maxage=600, stale-while-revalidate=3600"
      : "no-store"
  });
  return new Response(request.method === "HEAD" ? null : body, { status, headers });
}

function lastModifiedDate(value: string) {
  const match = value.match(/^\d{4}-\d{2}-\d{2}/);
  return match?.[0] || "";
}

function xmlResponse(request: Request, body: string) {
  return new Response(request.method === "HEAD" ? null : body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=3600",
      "x-content-type-options": "nosniff"
    }
  });
}

async function serveSitemap(request: Request, env: Env) {
  const url = new URL(request.url);
  if (url.pathname === "/sitemap.xml") {
    const entries = ["pages", ...seoConfig.indexing.collection_types.map((type) => routeForType(type)?.collection).filter(Boolean)];
    const body = entries.map((name) => `<sitemap><loc>${escapeXML(absoluteURL(`/sitemaps/${name}.xml`))}</loc></sitemap>`).join("");
    return xmlResponse(request, `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`);
  }

  const match = url.pathname.match(/^\/sitemaps\/([^/]+)\.xml$/);
  if (!match) return null;
  const name = match[1];
  if (name === "pages") {
    const paths = ["/", ...seoConfig.indexing.collection_types.flatMap((type) => {
      const route = routeForType(type);
      return route ? [`/${route.collection}`] : [];
    })];
    const values = paths.map((path) => `<url><loc>${escapeXML(absoluteURL(path))}</loc></url>`).join("");
    return xmlResponse(request, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${values}</urlset>`);
  }

  const route = routeForCollection(name);
  if (!route || !collectionIsIndexable(route.type)) {
    return new Response("Sitemap not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
  const rows = await env.DB.prepare(`
    SELECT id, type_id, title, body, body_html, body_path, fields_json, created_at, updated_at
    FROM objects WHERE type_id = ? ORDER BY id
  `).bind(route.type).all<SEOObject>();
  const values = (rows.results || []).filter(isObjectIndexable).map((object) => {
    const lastmod = lastModifiedDate(object.updated_at);
    return `<url><loc>${escapeXML(absoluteURL(objectPath(object)))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
  }).join("");
  return xmlResponse(request, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${values}</urlset>`);
}

function serveRobots(request: Request) {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Sitemap: https://companies.yan5xu.ai/sitemap.xml",
    ""
  ].join("\n");
  return new Response(request.method === "HEAD" ? null : body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=3600"
    }
  });
}

function serveIndexNowKey(request: Request) {
  const key = seoConfig.site.indexnow_key;
  if (!key) return null;
  return new Response(request.method === "HEAD" ? null : key, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "x-content-type-options": "nosniff",
      "x-robots-tag": "noindex, nofollow"
    }
  });
}

async function legacyPublicRedirect(url: URL, env: Env) {
  if (url.pathname !== "/") return null;
  const view = url.searchParams.get("view");
  if (view === "detail") {
    const id = url.searchParams.get("object") || "";
    const object = id ? await getSEOObject(id, env) : null;
    if (object) return Response.redirect(new URL(objectPath(object), url.origin).toString(), 301);
  }
  if (view === "objects") {
    const route = routeForType(url.searchParams.get("type") || "");
    if (route) return Response.redirect(new URL(`/${route.collection}`, url.origin).toString(), 301);
  }
  return null;
}

async function serveSEOPage(request: Request, env: Env) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const redirect = await legacyPublicRedirect(url, env);
  if (redirect) return redirect;

  if (url.pathname === "/") {
    const hasAppState = ["view", "type", "filter", "object", "graphView", "graphMode", "graphHiddenTypes"].some((name) => url.searchParams.has(name));
    return htmlPage(request, env, {
      shell: "",
      title: seoConfig.site.default_title,
      description: seoConfig.site.default_description,
      canonicalPath: "/",
      body: homeSEOBody(),
      indexable: !hasAppState,
      lang: "en",
      image: absoluteURL(seoConfig.site.default_image),
      type: "website",
      structuredData: homeStructuredData()
    });
  }

  if (["/graph", "/schema", "/health"].includes(url.pathname)) {
    const label = url.pathname.slice(1).replace(/^./, (character) => character.toUpperCase());
    return htmlPage(request, env, {
      shell: "",
      title: `${label} | ${seoConfig.site.name}`,
      description: `${label} workspace for the Oh My AI Company public research atlas.`,
      canonicalPath: url.pathname,
      body: appSEOBody(label, `Interactive ${label.toLowerCase()} workspace for the public research atlas.`),
      indexable: false,
      lang: "en"
    });
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts.length === 1) {
    const route = routeForCollection(parts[0]);
    if (!route) return null;
    const objects = await getSEOCollection(route.type, env);
    const indexable = collectionIsIndexable(route.type) && url.searchParams.size === 0;
    return htmlPage(request, env, {
      shell: "",
      title: `${route.label} — evidence-traceable AI research | ${seoConfig.site.short_name}`,
      description: `Browse ${route.label.toLowerCase()} and their connected evidence in the Oh My AI Company research atlas.`,
      canonicalPath: `/${route.collection}`,
      body: collectionSEOBody(route.type, objects),
      indexable,
      lang: "en",
      structuredData: collectionStructuredData(route.type, objects)
    });
  }

  if (parts.length === 2 && parts[0] === "objects") {
    let id = "";
    try { id = decodeURIComponent(parts[1]); } catch { id = ""; }
    const object = id ? await getSEOObject(id, env) : null;
    if (object) return Response.redirect(new URL(objectPath(object), url.origin).toString(), 301);
  }

  if (parts.length === 2) {
    const target = objectIDFromPath(parts[0], parts[1]);
    if (target) {
      const object = await getSEOObject(target.id, env);
      if (object && object.type_id === target.type) {
        const relations = await getSEORelations(object.id, env);
        return htmlPage(request, env, {
          shell: "",
          title: objectPageTitle(object),
          description: objectDescription(object),
          canonicalPath: objectPath(object),
          body: objectSEOBody(object, relations),
          indexable: isObjectIndexable(object) && url.searchParams.size === 0,
          lang: pageLanguage(object),
          image: firstObjectImage(object, normalizeAssetPath),
          type: "article",
          structuredData: objectStructuredData(object)
        });
      }
      return htmlPage(request, env, {
        shell: "",
        title: `Not found | ${seoConfig.site.name}`,
        description: "This URL does not match a published research object.",
        canonicalPath: url.pathname,
        body: notFoundSEOBody(),
        indexable: false,
        lang: "en"
      }, 404);
    }
  }
  return null;
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
      status_label: "Public · Full vault · Read-only"
    });
  }
  if (url.pathname === "/api/run" && request.method === "POST") return handleRun(request, env);
  if (url.pathname === "/api/file" && request.method === "GET") {
    const target = url.searchParams.get("path") || "";
    const base = url.searchParams.get("base") || "";
    const candidates = [...new Set([
      normalizeAssetPath(target, base),
      normalizeAssetPath(target, "")
    ])];
    for (const key of candidates) {
      const response = await serveMediaKey(key, env);
      if (response.status !== 404) return response;
    }
    return new Response("Not found", { status: 404 });
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
      if (seoConfig.site.indexnow_key && url.pathname === `/${seoConfig.site.indexnow_key}.txt`) {
        const response = serveIndexNowKey(request);
        if (response) return response;
      }
      if (url.pathname === "/robots.txt") return serveRobots(request);
      if (url.pathname === "/sitemap.xml" || url.pathname.startsWith("/sitemaps/")) {
        const sitemap = await serveSitemap(request, env);
        if (sitemap) return sitemap;
      }
      const seoPage = await serveSEOPage(request, env);
      if (seoPage) return seoPage;
      const response = await env.ASSETS.fetch(request);
      if (!response.headers.get("content-type")?.includes("text/html")) return response;
      return htmlPage(request, env, {
        shell: "",
        title: `Not found | ${seoConfig.site.name}`,
        description: "This URL does not match a published page or asset.",
        canonicalPath: url.pathname,
        body: notFoundSEOBody(),
        indexable: false,
        lang: "en"
      }, 404);
    } catch (error) {
      console.error(error);
      return json({ error: "internal error" }, { status: 500 });
    }
  }
} satisfies ExportedHandler<Env>;
