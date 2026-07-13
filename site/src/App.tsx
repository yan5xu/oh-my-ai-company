import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState
} from "@tanstack/react-table";
import {
  ArrowLeft, ArrowUpRight, BookOpen, Boxes, ChevronLeft, ChevronRight,
  CircleDot, ExternalLink, Github, Languages, Menu, Network, PanelLeftClose,
  PanelLeftOpen, Search, X
} from "lucide-react";
import { api } from "./api";
import { MarkdownBody } from "./MarkdownBody";
import { summaryFor, tagsFor, textValue } from "./lib";
import type { PublicLink, PublicObject, TypeSummary } from "./types";
import { Button, Input, Pill } from "./ui";

const GraphView = lazy(() => import("./GraphView"));

type RouteState = {
  view: "objects" | "detail" | "graph";
  type: string;
  object: string;
  q: string;
};

type Language = "zh" | "en";

const copy = {
  zh: {
    directory: "研究目录", graph: "关系图", search: "搜索当前类型", allResearch: "研究对象",
    records: "条记录", updated: "更新", empty: "没有找到匹配的对象", previous: "上一页", next: "下一页",
    overview: "概览", fields: "结构化字段", relations: "关系", evidence: "正文", openSite: "访问网站",
    openGraph: "查看关系图", back: "返回目录", incoming: "反向关联", outgoing: "关联对象", generated: "数据更新于",
    loading: "正在读取研究库", source: "开源仓库", relationHint: "双击节点打开对象", depth: "两层关系"
  },
  en: {
    directory: "Directory", graph: "Graph", search: "Search this type", allResearch: "Research objects",
    records: "records", updated: "Updated", empty: "No matching objects", previous: "Previous", next: "Next",
    overview: "Overview", fields: "Structured fields", relations: "Relations", evidence: "Research body", openSite: "Visit website",
    openGraph: "Open graph", back: "Back to directory", incoming: "Backlinks", outgoing: "Outgoing", generated: "Data generated",
    loading: "Loading research atlas", source: "Open-source repository", relationHint: "Double-click a node to open it", depth: "Two-hop graph"
  }
};

const typeLabels: Record<string, [string, string]> = {
  company: ["公司与产品", "Companies"], investor: ["投资机构", "Investors"], person: ["人物", "People"],
  investment: ["投资事件", "Investments"], concept: ["概念", "Concepts"], note: ["研究笔记", "Notes"],
  "source.item": ["证据来源", "Sources"], touchpoint: ["持续触点", "Touchpoints"],
  "traffic.snapshot": ["流量快照", "Traffic"], method: ["研究方法", "Methods"], batch: ["批次", "Batches"]
};

function readRoute(): RouteState {
  const params = new URLSearchParams(window.location.search);
  const object = params.get("object") || "";
  const rawView = params.get("view");
  return {
    view: rawView === "graph" ? "graph" : object ? "detail" : "objects",
    type: params.get("type") || "company",
    object,
    q: params.get("q") || ""
  };
}

function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const pop = () => setRoute(readRoute());
    window.addEventListener("popstate", pop);
    return () => window.removeEventListener("popstate", pop);
  }, []);
  const navigate = (patch: Partial<RouteState>, replace = false) => {
    const next = { ...route, ...patch };
    const params = new URLSearchParams();
    if (next.view !== "objects") params.set("view", next.view);
    if (next.type !== "company") params.set("type", next.type);
    if (next.object) params.set("object", next.object);
    if (next.q) params.set("q", next.q);
    const url = `${window.location.pathname}${params.size ? `?${params}` : ""}`;
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
    setRoute(next);
  };
  return [route, navigate] as const;
}

function preferredLink(fields: Record<string, unknown>) {
  for (const key of ["website", "homepage_url", "url"]) {
    const value = textValue(fields[key]);
    if (/^https?:\/\//.test(value)) return value;
  }
  return "";
}

function displayField(value: unknown) {
  const text = textValue(value);
  if (/^https?:\/\//.test(text)) return <a className="field-link" href={text} target="_blank" rel="noreferrer">{text}<ExternalLink className="size-3" /></a>;
  return text || <span className="text-[#aaa59d]">-</span>;
}

function Sidebar({ types, activeType, language, collapsed, onCollapse, onType, onLanguage }: {
  types: TypeSummary[]; activeType: string; language: Language; collapsed: boolean;
  onCollapse: () => void; onType: (id: string) => void; onLanguage: () => void;
}) {
  const t = copy[language];
  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="brand-row">
        <button className="brand" onClick={() => onType("company")} aria-label="Oh My AI Company">
          <span className="brand-mark">OM</span>
          {!collapsed && <span className="brand-name">Oh My<br />AI Company</span>}
        </button>
        <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onCollapse} title={collapsed ? "Expand" : "Collapse"}>
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </Button>
      </div>

      <nav className="type-nav" aria-label={t.directory}>
        {!collapsed && <div className="nav-label">{t.directory}</div>}
        {types.map((type) => {
          const label = typeLabels[type.id]?.[language === "zh" ? 0 : 1] || type.name || type.id;
          return (
            <button key={type.id} className={`type-link ${activeType === type.id ? "is-active" : ""}`} onClick={() => onType(type.id)} title={collapsed ? label : undefined}>
              <CircleDot className="type-dot size-3.5" />
              {!collapsed && <><span>{label}</span><span className="type-count">{type.object_count}</span></>}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Button variant="ghost" size={collapsed ? "icon" : "sm"} className="w-full justify-start" onClick={onLanguage} title="Language">
          <Languages className="size-4" />{!collapsed && (language === "zh" ? "English" : "中文")}
        </Button>
        {!collapsed && <a className="repo-link" href="https://github.com/yan5xu/oh-my-ai-company" target="_blank" rel="noreferrer"><Github className="size-3.5" />{t.source}</a>}
      </div>
    </aside>
  );
}

const columnHelper = createColumnHelper<PublicObject>();

function ObjectDirectory({ type, query, language, openObject, setSearch }: {
  type: string; query: string; language: Language; openObject: (id: string) => void; setSearch: (q: string) => void;
}) {
  const t = copy[language];
  const [page, setPage] = useState(0);
  const [search, setLocalSearch] = useState(query);
  const [sorting, setSorting] = useState<SortingState>([]);
  const deferred = useDeferredValue(search);
  const limit = 50;

  useEffect(() => { setLocalSearch(query); }, [query]);
  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(deferred), 180);
    return () => window.clearTimeout(timer);
  }, [deferred, setSearch]);
  useEffect(() => { setPage(0); }, [type, deferred]);

  const objects = useQuery({
    queryKey: ["objects", type, deferred, page],
    queryFn: () => api.objects(type, deferred, page * limit, limit),
    placeholderData: (previous) => previous
  });
  const label = typeLabels[type]?.[language === "zh" ? 0 : 1] || type;

  const columns = useMemo(() => [
    columnHelper.accessor("title", {
      header: label,
      cell: ({ row }) => <div className="object-title-cell"><strong>{row.original.title || row.original.id}</strong><span>{row.original.id}</span></div>
    }),
    columnHelper.display({
      id: "summary",
      header: t.overview,
      cell: ({ row }) => <span className="summary-cell">{summaryFor(row.original.fields) || "-"}</span>
    }),
    columnHelper.display({
      id: "tags",
      header: "Tags",
      cell: ({ row }) => <div className="tag-line">{tagsFor(row.original.fields).map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>
    }),
    columnHelper.accessor("updated_at", {
      header: t.updated,
      cell: ({ getValue }) => <time className="date-cell">{String(getValue()).slice(0, 10)}</time>
    })
  ], [label, t.overview, t.updated]);

  const table = useReactTable({
    data: objects.data?.items || [], columns, state: { sorting }, onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel()
  });
  const total = objects.data?.total || 0;

  return (
    <section className="directory-page">
      <header className="directory-header">
        <div>
          <div className="eyebrow">{t.allResearch}</div>
          <h1>{label}</h1>
          <p>{total.toLocaleString()} {t.records}</p>
        </div>
        <label className="search-box">
          <Search className="size-4" />
          <Input value={search} onChange={(event) => setLocalSearch(event.target.value)} placeholder={t.search} />
          {search && <button onClick={() => setLocalSearch("")} aria-label="Clear"><X className="size-3.5" /></button>}
        </label>
      </header>

      <div className="table-frame">
        <table className="object-table">
          <thead>{table.getHeaderGroups().map((group) => <tr key={group.id}>{group.headers.map((header) => <th key={header.id} onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header, header.getContext())}</th>)}</tr>)}</thead>
          <tbody>
            {objects.isLoading ? <tr><td colSpan={4} className="empty-row">{t.loading}</td></tr> : table.getRowModel().rows.length === 0 ? <tr><td colSpan={4} className="empty-row">{t.empty}</td></tr> : table.getRowModel().rows.map((row) => (
              <tr key={row.id} tabIndex={0} onClick={() => openObject(row.original.id)} onKeyDown={(event) => { if (event.key === "Enter") openObject(row.original.id); }}>
                {row.getVisibleCells().map((cell) => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="pagination">
        <span>{page * limit + (total ? 1 : 0)}-{Math.min((page + 1) * limit, total)} / {total}</span>
        <div>
          <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="size-3.5" />{t.previous}</Button>
          <Button variant="secondary" size="sm" disabled={(page + 1) * limit >= total} onClick={() => setPage((value) => value + 1)}>{t.next}<ChevronRight className="size-3.5" /></Button>
        </div>
      </footer>
    </section>
  );
}

function RelationList({ title, links, openObject }: { title: string; links: PublicLink[]; openObject: (id: string) => void }) {
  if (links.length === 0) return null;
  return <section className="inspector-section"><h3>{title}<span>{links.length}</span></h3><div>{links.slice(0, 40).map((link) => <button className="relation-row" key={`${link.id}-${link.object_id}`} onClick={() => openObject(link.object_id)}><span><strong>{link.title || link.object_id}</strong><small>{link.relation} · {link.type_id}</small></span><ArrowUpRight className="size-3.5" /></button>)}</div></section>;
}

function ObjectDetail({ id, language, back, openObject, openGraph }: { id: string; language: Language; back: () => void; openObject: (id: string) => void; openGraph: () => void }) {
  const t = copy[language];
  const detail = useQuery({ queryKey: ["object", id], queryFn: () => api.object(id), enabled: Boolean(id) });
  if (detail.isLoading || !detail.data) return <div className="page-loading">{t.loading}</div>;
  const { object, links, backlinks } = detail.data;
  const website = preferredLink(object.fields);
  const allLinks = [...links, ...backlinks];

  return (
    <section className="detail-page">
      <header className="detail-topbar">
        <Button variant="ghost" size="sm" onClick={back}><ArrowLeft className="size-4" />{t.back}</Button>
        <div className="detail-actions">
          <Button variant="secondary" size="sm" onClick={openGraph}><Network className="size-4" />{t.openGraph}</Button>
          {website && <a className="button-link" href={website} target="_blank" rel="noreferrer">{t.openSite}<ExternalLink className="size-3.5" /></a>}
        </div>
      </header>
      <div className="detail-grid">
        <main className="detail-main">
          <header className="object-heading">
            <div className="eyebrow">{typeLabels[object.type_id]?.[language === "zh" ? 0 : 1] || object.type_id}</div>
            <h1>{object.title || object.id}</h1>
            <div className="object-id">{object.id}</div>
            {summaryFor(object.fields) && <p>{summaryFor(object.fields)}</p>}
          </header>
          <MarkdownBody body={object.body || ""} links={allLinks} openObject={openObject} />
        </main>
        <aside className="detail-inspector">
          <section className="inspector-section">
            <h3>{t.fields}</h3>
            <dl>{Object.entries(object.fields).filter(([, value]) => textValue(value)).map(([key, value]) => <div key={key}><dt>{key.replaceAll("_", " ")}</dt><dd>{displayField(value)}</dd></div>)}</dl>
          </section>
          <RelationList title={t.outgoing} links={links} openObject={openObject} />
          <RelationList title={t.incoming} links={backlinks} openObject={openObject} />
        </aside>
      </div>
    </section>
  );
}

function GraphPage({ id, language, back, openObject, hiddenTypes, setTypeVisible }: {
  id: string; language: Language; back: () => void; openObject: (id: string) => void;
  hiddenTypes: Set<string>; setTypeVisible: (type: string, visible: boolean) => void;
}) {
  const t = copy[language];
  const [depth, setDepth] = useState(1);
  const graph = useQuery({ queryKey: ["graph", id, depth], queryFn: () => api.graph(id, depth), enabled: Boolean(id) });
  const center = graph.data?.nodes.find((node) => node.id === id);
  const graphTypes = useMemo(() => [...new Set((graph.data?.nodes || []).map((node) => node.type_id))].sort(), [graph.data?.nodes]);
  const visibleNodes = useMemo(() => (graph.data?.nodes || []).filter((node) => node.id === id || !hiddenTypes.has(node.type_id)), [graph.data?.nodes, hiddenTypes, id]);
  const visibleIDs = useMemo(() => new Set(visibleNodes.map((node) => node.id)), [visibleNodes]);
  const visibleEdges = useMemo(() => (graph.data?.edges || []).filter((edge) => visibleIDs.has(edge.from_object_id) && visibleIDs.has(edge.to_object_id)), [graph.data?.edges, visibleIDs]);
  return (
    <section className="graph-page">
      <header className="graph-toolbar">
        <Button variant="ghost" size="sm" onClick={back}><ArrowLeft className="size-4" />{t.back}</Button>
        <div className="graph-title"><Network className="size-4" /><strong>{center?.title || id}</strong><span>{visibleNodes.length} nodes · {visibleEdges.length} links</span></div>
        <Button variant={depth === 2 ? "primary" : "secondary"} size="sm" onClick={() => setDepth((value) => value === 1 ? 2 : 1)}>{t.depth}</Button>
      </header>
      <div className="graph-type-filters">{graphTypes.map((type) => <button key={type} className={!hiddenTypes.has(type) ? "is-active" : ""} onClick={() => setTypeVisible(type, hiddenTypes.has(type))}><span />{typeLabels[type]?.[language === "zh" ? 0 : 1] || type}</button>)}</div>
      <div className="graph-hint">{t.relationHint}</div>
      <div className="graph-canvas">{graph.data && <Suspense fallback={<div className="page-loading">{t.loading}</div>}><GraphView center={id} objects={visibleNodes} edges={visibleEdges} openObject={openObject} /></Suspense>}</div>
    </section>
  );
}

declare global {
  interface Window {
    ohMyAI?: {
      state: () => RouteState & { language: Language; graphHiddenTypes: string[] };
      selectType: (type: string) => void;
      search: (query: string) => void;
      openObject: (id: string) => void;
      openGraph: (id?: string) => void;
      setGraphTypeVisible: (type: string, visible: boolean) => void;
      setLanguage: (language: Language) => void;
    };
  }
}

export function App() {
  const [route, navigate] = useRoute();
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem("ohmyai-language") === "en" ? "en" : "zh");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [graphHiddenTypes, setGraphHiddenTypes] = useState(() => new Set(["source.item"]));
  const types = useQuery({ queryKey: ["types"], queryFn: api.types });
  const meta = useQuery({ queryKey: ["meta"], queryFn: api.meta });

  const selectType = (type: string) => { navigate({ view: "objects", type, object: "", q: "" }); setMobileNav(false); };
  const openObject = (id: string) => { const type = id.split(".")[0] || route.type; navigate({ view: "detail", type, object: id }); };
  const openGraph = (id = route.object) => navigate({ view: "graph", object: id });
  const changeLanguage = (next: Language) => { localStorage.setItem("ohmyai-language", next); setLanguage(next); };

  useEffect(() => {
    window.ohMyAI = {
      state: () => ({ ...readRoute(), language, graphHiddenTypes: [...graphHiddenTypes] }),
      selectType,
      search: (q) => navigate({ view: "objects", q }),
      openObject,
      openGraph,
      setGraphTypeVisible: (type, visible) => setGraphHiddenTypes((current) => {
        const next = new Set(current);
        if (visible) next.delete(type); else next.add(type);
        return next;
      }),
      setLanguage: changeLanguage
    };
    return () => { delete window.ohMyAI; };
  });

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className={`mobile-sidebar ${mobileNav ? "is-open" : ""}`}><Sidebar types={types.data || []} activeType={route.type} language={language} collapsed={false} onCollapse={() => setMobileNav(false)} onType={selectType} onLanguage={() => changeLanguage(language === "zh" ? "en" : "zh")} /></div>
      {mobileNav && <button className="mobile-scrim" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}
      <Sidebar types={types.data || []} activeType={route.type} language={language} collapsed={collapsed} onCollapse={() => setCollapsed((value) => !value)} onType={selectType} onLanguage={() => changeLanguage(language === "zh" ? "en" : "zh")} />
      <main className="app-main">
        <div className="mobile-topbar"><Button variant="ghost" size="icon" onClick={() => setMobileNav(true)}><Menu className="size-5" /></Button><span>Oh My AI Company</span></div>
        {route.view === "objects" && <ObjectDirectory type={route.type} query={route.q} language={language} openObject={openObject} setSearch={(q) => navigate({ q }, true)} />}
        {route.view === "detail" && <ObjectDetail id={route.object} language={language} back={() => navigate({ view: "objects", object: "" })} openObject={openObject} openGraph={() => openGraph()} />}
        {route.view === "graph" && <GraphPage id={route.object} language={language} back={() => navigate({ view: "detail" })} openObject={openObject} hiddenTypes={graphHiddenTypes} setTypeVisible={(type, visible) => setGraphHiddenTypes((current) => { const next = new Set(current); if (visible) next.delete(type); else next.add(type); return next; })} />}
        {route.view === "objects" && meta.data && <div className="data-stamp">{copy[language].generated}: {meta.data.generated_at?.slice(0, 10)} · {meta.data.object_count.toLocaleString()} objects · {meta.data.link_count.toLocaleString()} links</div>}
      </main>
    </div>
  );
}
