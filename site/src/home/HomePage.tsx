import {
  ArrowRight,
  Building2,
  Button,
  ExternalLink,
  Github,
  Languages,
  Network,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
  useEffect,
  useQuery,
  useState,
  type SiteHomeProps
} from "@memex/site";
import graphImage from "./assets/research-graph.png";
import { featuredResearch, homeCopy } from "./home-content";
import "./home.css";

type PublicObject = {
  id: string;
  type_id: string;
  title: string;
  updated_at: string;
  fields: Record<string, unknown>;
};

type ObjectList = {
  items: PublicObject[];
  total: number;
};

type PublicMeta = {
  generated_at: string | null;
  object_count: number;
  link_count: number;
  company_count: number;
};

const ontologyNodes = [
  { id: "source", x: 8, y: 17, href: "/sources" },
  { id: "traffic", x: 8, y: 48, href: "/traffic" },
  { id: "method", x: 8, y: 80, href: "/methods" },
  { id: "note", x: 29, y: 17, href: "/notes" },
  { id: "concept", x: 29, y: 80, href: "/concepts" },
  { id: "company", x: 48, y: 48, href: "/companies" },
  { id: "investment", x: 68, y: 27, href: "/investments" },
  { id: "investor", x: 89, y: 18, href: "/investors" },
  { id: "person", x: 89, y: 68, href: "/people" },
  { id: "touchpoint", x: 68, y: 91, href: "/touchpoints" }
] as const;

const ontologyEdges = [
  { from: "source", to: "note" },
  { from: "source", to: "company" },
  { from: "traffic", to: "company" },
  { from: "method", to: "note" },
  { from: "note", to: "company" },
  { from: "note", to: "concept" },
  { from: "company", to: "concept" },
  { from: "company", to: "investment" },
  { from: "investment", to: "investor" },
  { from: "company", to: "person", label: "founders" },
  { from: "touchpoint", to: "company" },
  { from: "touchpoint", to: "investor" },
  { from: "touchpoint", to: "person" }
] as const;

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

function objectPath(object: Pick<PublicObject, "id" | "type_id">) {
  const slug = object.id.includes(".") ? object.id.slice(object.id.indexOf(".") + 1) : object.id;
  if (object.type_id === "company") return `/companies/${encodeURIComponent(slug)}`;
  if (object.type_id === "investor") return `/investors/${encodeURIComponent(slug)}`;
  return `/objects/${encodeURIComponent(object.id)}`;
}

function formatDate(value: string | null | undefined, language: "zh" | "en") {
  if (!value) return "—";
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function fieldText(object: PublicObject | undefined, key: string) {
  const value = object?.fields?.[key];
  return typeof value === "string" ? value : "";
}

export function HomePage({ language, setLanguage, automationRef }: SiteHomeProps) {
  const copy = homeCopy[language];
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const meta = useQuery({
    queryKey: ["omac-home", "meta"],
    queryFn: () => fetchJSON<PublicMeta>("/api/meta")
  });

  const featured = useQuery({
    queryKey: ["omac-home", "featured"],
    queryFn: async () => Promise.all(featuredResearch.map(async (item) => {
      const detail = await fetchJSON<{ object: PublicObject }>(`/api/objects/${encodeURIComponent(item.id)}`);
      return { ...item, object: detail.object };
    }))
  });

  const latest = useQuery({
    queryKey: ["omac-home", "latest"],
    queryFn: async () => {
      const result = await fetchJSON<ObjectList>("/api/objects?type=company&limit=100");
      return [...result.items]
        .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
        .slice(0, 5);
    }
  });

  const suggestions = useQuery({
    queryKey: ["omac-home", "search", query],
    queryFn: () => fetchJSON<ObjectList>(`/api/objects?type=company&q=${encodeURIComponent(query.trim())}&limit=6`),
    enabled: query.trim().length >= 2
  });

  function submitSearch(value = query) {
    const next = value.trim();
    if (!next) {
      window.location.assign("/companies");
      return;
    }
    window.location.assign(`/companies?filter=${encodeURIComponent(`title contains "${next.replaceAll('"', "")}"`)}`);
  }

  useEffect(() => {
    const controller = {
      state: () => ({
        page: "home",
        language,
        searchQuery: query,
        mobileMenuOpen,
        metaLoaded: Boolean(meta.data),
        featuredCount: featured.data?.length ?? 0,
        latestCount: latest.data?.length ?? 0,
        suggestionCount: suggestions.data?.items.length ?? 0
      }),
      invoke: async (action: string, payload?: unknown) => {
        if (action === "setSearch") {
          const value = typeof payload === "string"
            ? payload
            : String((payload as { query?: unknown } | null)?.query ?? "");
          setQuery(value);
          return { action, query: value };
        }
        if (action === "submitSearch") {
          const value = typeof payload === "string" ? payload : query;
          submitSearch(value);
          return { action, query: value };
        }
        if (action === "setLanguage" && (payload === "zh" || payload === "en")) {
          await setLanguage(payload);
          return { action, language: payload };
        }
        if (action === "toggleMenu") {
          setMobileMenuOpen((open) => !open);
          return { action };
        }
        throw new Error(`Unknown site action: ${action}`);
      }
    };
    automationRef.current = controller;
    return () => {
      if (automationRef.current === controller) automationRef.current = null;
    };
  }, [automationRef, featured.data, language, latest.data, meta.data, mobileMenuOpen, query, setLanguage, suggestions.data]);

  return (
    <div className="omac-home">
      <section className="omac-hero" aria-labelledby="omac-title">
        <img className="omac-hero-image" src={graphImage} alt="Oh My AI Company investment graph" />
        <div className="omac-hero-veil" aria-hidden="true" />

        <header className="omac-header">
          <a className="omac-brand" href="/" aria-label="Oh My AI Company home">
            <span className="omac-brand-mark">OM</span>
            <span>Oh My AI Company</span>
          </a>

          <nav className={`omac-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            <a href="/companies">{copy.nav.companies}</a>
            <a href="/investors">{copy.nav.investors}</a>
            <a href="/graph">{copy.nav.graph}</a>
            <a href="#method">{copy.nav.method}</a>
          </nav>

          <div className="omac-header-actions">
            <button className="omac-language" type="button" onClick={() => void setLanguage(language === "zh" ? "en" : "zh")} aria-label="Switch language">
              <Languages aria-hidden="true" />
              <span>{language === "zh" ? "EN" : "中文"}</span>
            </button>
            <button className="omac-menu-button" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
              {mobileMenuOpen ? <X /> : <span className="omac-menu-lines" aria-hidden="true" />}
            </button>
          </div>
        </header>

        <div className="omac-hero-content">
          <p className="omac-eyebrow"><Sparkles aria-hidden="true" />{copy.eyebrow}</p>
          <h1 id="omac-title">Oh My AI Company</h1>
          <p className="omac-hero-lead">{copy.lead}</p>
          <p className="omac-hero-description">{copy.description}</p>

          <form className="omac-search" onSubmit={(event) => { event.preventDefault(); submitSearch(); }}>
            <Search aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchPlaceholder}
              autoComplete="off"
            />
            <Button type="submit" size="lg">{copy.searchAction}<ArrowRight aria-hidden="true" /></Button>
            {query.trim().length >= 2 && (
              <div className="omac-search-results" role="listbox">
                {suggestions.isLoading && <div className="omac-search-empty">Loading…</div>}
                {!suggestions.isLoading && suggestions.data?.items.length === 0 && <div className="omac-search-empty">{copy.noResults}</div>}
                {suggestions.data?.items.map((object) => (
                  <a key={object.id} href={objectPath(object)} role="option">
                    <span>{object.title}</span>
                    <span>{fieldText(object, "one_liner")}</span>
                  </a>
                ))}
              </div>
            )}
          </form>
          <p className="omac-search-hint">{copy.searchHint}</p>
          <div className="omac-topic-links" aria-label={copy.topicsLabel}>
            <span>{copy.topicsLabel}</span>
            {copy.topics.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </div>
        </div>

        <div className="omac-hero-stats" aria-label="Research snapshot">
          <div><strong>{meta.data?.company_count ?? "—"}</strong><span>{copy.stats.companies}</span></div>
          <div><strong>{meta.data?.object_count ?? "—"}</strong><span>{copy.stats.objects}</span></div>
          <div><strong>{meta.data?.link_count ?? "—"}</strong><span>{copy.stats.links}</span></div>
          <div><strong>{formatDate(meta.data?.generated_at, language)}</strong><span>{copy.stats.updated}</span></div>
        </div>
      </section>

      <main>
        <section className="omac-section omac-start">
          <div className="omac-section-heading">
            <p className="omac-eyebrow">{copy.startEyebrow}</p>
            <h2>{copy.startTitle}</h2>
            <p>{copy.startDescription}</p>
          </div>
          <div className="omac-paths">
            {copy.paths.map((path) => (
              <article key={path.number} className="omac-path">
                <span>{path.number}</span>
                <h3>{path.title}</h3>
                <p>{path.text}</p>
                <a href={path.href}>{path.action}<ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="omac-section omac-featured">
          <div className="omac-section-heading is-row">
            <div>
              <p className="omac-eyebrow">{copy.featuredEyebrow}</p>
              <h2>{copy.featuredTitle}</h2>
            </div>
            <a className="omac-text-link" href="/companies">{copy.latestAction}<ArrowRight aria-hidden="true" /></a>
          </div>

          <div className="omac-feature-grid">
            {featuredResearch.map((item, index) => {
              const object = featured.data?.find((candidate) => candidate.id === item.id)?.object;
              return (
                <a className="omac-feature" href={object ? objectPath(object) : "#"} key={item.id} aria-disabled={!object}>
                  <div className="omac-feature-media"><img src={item.image} alt="" /></div>
                  <div className="omac-feature-copy">
                    <span>{object?.type_id ?? (item.id.startsWith("investor.") ? "investor" : "company")} · {String(index + 1).padStart(2, "0")}</span>
                    <h3>{object?.title ?? item.id}</h3>
                    <p>{item[language]}</p>
                    <strong>{copy.featuredAction}<ArrowRight aria-hidden="true" /></strong>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="omac-graph-band">
          <div className="omac-graph-copy">
            <p className="omac-eyebrow"><Network aria-hidden="true" />{copy.graphEyebrow}</p>
            <h2>{copy.graphTitle}</h2>
            <p>{copy.graphDescription}</p>
            <a href="/graph">{copy.graphAction}<ArrowRight aria-hidden="true" /></a>
          </div>
          <figure className="omac-graph-figure">
            <img src={graphImage} alt="Investment graph connecting an investor to portfolio companies" />
          </figure>
        </section>

        <section className="omac-section omac-model" aria-labelledby="omac-model-title">
          <div className="omac-section-heading">
            <p className="omac-eyebrow">{copy.modelEyebrow}</p>
            <h2 id="omac-model-title">{copy.modelTitle}</h2>
            <p>{copy.modelDescription}</p>
          </div>
          <div className="omac-model-layers">
            {copy.modelLayers.map((layer) => (
              <article className="omac-model-layer" key={layer.number}>
                <span>{layer.number}</span>
                <h3>{layer.title}</h3>
                <strong>{layer.types}</strong>
                <p>{layer.text}</p>
              </article>
            ))}
          </div>
          <p className="omac-model-flow">{copy.modelFlow}</p>
          <div className="omac-ontology-heading">
            <h3 id="omac-ontology-title">{copy.modelGraphTitle}</h3>
            <p>{copy.modelGraphDescription}</p>
          </div>
          <nav className="omac-ontology" aria-labelledby="omac-ontology-title">
            <svg viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="omac-ontology-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 8 4 L 0 8 z" />
                </marker>
              </defs>
              {ontologyEdges.map((edge) => {
                const from = ontologyNodes.find((node) => node.id === edge.from)!;
                const to = ontologyNodes.find((node) => node.id === edge.to)!;
                const labelX = (from.x + to.x) * 5;
                const labelY = (from.y + to.y) * 2.6;
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line x1={from.x * 10} y1={from.y * 5.2} x2={to.x * 10} y2={to.y * 5.2} />
                    {"label" in edge && <text x={labelX} y={labelY - 8}>{edge.label}</text>}
                  </g>
                );
              })}
            </svg>
            {ontologyNodes.map((node) => (
              <a
                className={`omac-ontology-node is-${node.id}`}
                href={node.href}
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <strong>{node.id}</strong>
                <span>{copy.modelNodes[node.id]}</span>
              </a>
            ))}
          </nav>
          <div className="omac-ontology-paths">
            {copy.modelPaths.map((path) => <code key={path}>{path}</code>)}
          </div>
          <aside className="omac-model-debt">
            <div>
              <h3>{copy.modelDebtTitle}</h3>
              <p>{copy.modelDebtDescription}</p>
            </div>
            <ol>
              {copy.modelDebts.map((debt, index) => (
                <li key={debt}><span>{String(index + 1).padStart(2, "0")}</span>{debt}</li>
              ))}
            </ol>
            <a href="https://github.com/yan5xu/oh-my-ai-company#%E6%95%B0%E6%8D%AE%E8%BE%B9%E7%95%8C" target="_blank" rel="noreferrer">
              {copy.modelDebtAction}<ExternalLink aria-hidden="true" />
            </a>
          </aside>
        </section>

        <section className="omac-section omac-latest">
          <div className="omac-section-heading">
            <p className="omac-eyebrow">{copy.latestEyebrow}</p>
            <h2>{copy.latestTitle}</h2>
            <p>{copy.latestDescription}</p>
          </div>
          <div className="omac-latest-list">
            {(latest.data ?? []).map((object, index) => (
              <a href={objectPath(object)} key={object.id}>
                <span className="omac-latest-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="omac-latest-name"><strong>{object.title}</strong><small>{fieldText(object, "one_liner")}</small></span>
                <time>{formatDate(object.updated_at, language)}</time>
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </div>
          <a className="omac-text-link omac-latest-more" href="/companies">{copy.latestAction}<ArrowRight aria-hidden="true" /></a>
        </section>

        <section className="omac-method" id="method">
          <div className="omac-method-intro">
            <p className="omac-eyebrow">{copy.methodEyebrow}</p>
            <h2>{copy.methodTitle}</h2>
            <p>{copy.methodDescription}</p>
            <p className="omac-method-boundary">{copy.methodBoundary}</p>
            <a href="https://github.com/yan5xu/oh-my-ai-company" target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />{copy.repoAction}<ExternalLink aria-hidden="true" />
            </a>
          </div>
          <div className="omac-method-steps">
            {copy.methodSteps.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="omac-footer">
        <a className="omac-brand" href="/"><span className="omac-brand-mark">OM</span><span>Oh My AI Company</span></a>
        <p>{copy.footer}</p>
        <div>
          <a href="/companies"><Building2 aria-hidden="true" />{copy.nav.companies}</a>
          <a href="/investors"><Users aria-hidden="true" />{copy.nav.investors}</a>
          <a href="/graph"><TrendingUp aria-hidden="true" />{copy.nav.graph}</a>
        </div>
      </footer>
    </div>
  );
}
