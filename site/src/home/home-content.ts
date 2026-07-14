export const featuredResearch = [
  {
    id: "company.kernel",
    image: "/media/assets/kernel/homepage-hero.png",
    zh: "面向 AI agent 的云浏览器基础设施，以及它与 Browserbase、Browserless 的产品边界。",
    en: "Cloud browser infrastructure for AI agents, mapped against Browserbase and Browserless."
  },
  {
    id: "company.sapiom",
    image: "/media/assets/sapiom/platform-control.png",
    zh: "从 Agent 支付网关到执行引擎，理解能力调用、计费与治理如何合成控制面。",
    en: "From agent payments to an execution engine for capabilities, billing, and governance."
  },
  {
    id: "company.superset",
    image: "/media/assets/superset/homepage-product-2026-07-14.png",
    zh: "从 launch、demo 和流量信号，看 coding agent cockpit 如何建立产品叙事与分发。",
    en: "Follow launch, demo, and traffic signals to see how a coding-agent cockpit builds narrative and distribution."
  },
  {
    id: "company.harvey",
    image: "/media/assets/harvey-homepage-hero-2026-07-13.png",
    zh: "从法律 AI 产品走向专业服务平台，观察垂直 AI 的企业分发与规模化路径。",
    en: "How a legal AI product is becoming a professional-services platform for enterprise work."
  }
] as const;

export const homeCopy = {
  zh: {
    nav: {
      companies: "公司",
      investors: "投资机构",
      graph: "关系图谱",
      method: "研究方法"
    },
    eyebrow: "持续生长、证据可追溯的 AI Company Atlas",
    lead: "从深度公司卷宗出发，沿产品、人物、资本、增长信号与研究判断继续探索。",
    description: "面向持续跟踪 AI 市场的 founder、产品、投资和研究从业者。这里不是新闻目录或公司榜单，而是把公司、创始人、投资机构、融资、产品演化、流量与 GTM、社区反馈连接成网络。",
    searchPlaceholder: "搜索公司，例如 Kernel、Sapiom、Superset…",
    searchAction: "开始探索",
    searchHint: "按公司进入，也可以从专题与关系图继续。",
    topicsLabel: "热门专题",
    topics: [
      ["Agent Infra", "/companies?filter=category%3Dagent-infra"],
      ["企业 Agent / AI Employee", "/companies?filter=category%3Denterprise-agent"],
      ["Agent 支付、治理与执行层", "/companies?filter=tags%3Dagent-payments"]
    ],
    stats: {
      companies: "公司档案",
      objects: "研究对象",
      links: "结构化关系",
      updated: "公开快照"
    },
    startEyebrow: "如何使用",
    startTitle: "从一个名字进入，再沿着证据和关系继续。",
    startDescription: "这不是公司榜单。每个入口都通向正文、结构化字段、来源与上下游对象。",
    paths: [
      {
        number: "01",
        title: "找公司",
        text: "按 Agent Infra、企业 Agent、垂直 AI 与开发者工具等主题进入深度卷宗。",
        href: "/companies",
        action: "浏览公司"
      },
      {
        number: "02",
        title: "看网络",
        text: "从机构 portfolio、公司投资人、人物与公司关系，继续展开竞品和相邻市场。",
        href: "/graph",
        action: "打开关系图"
      },
      {
        number: "03",
        title: "看流量与增长信号",
        text: "比较带时间边界的 traffic.snapshot，辅助理解网站关注度与渠道结构，不把流量等同于用户量。",
        href: "/traffic",
        action: "查看增长信号"
      },
      {
        number: "04",
        title: "验证证据与判断",
        text: "从 source.item 回到原始来源、时间和证据等级，再通过 note 区分事实与研究 takeaway。",
        href: "/sources",
        action: "查看证据"
      }
    ],
    featuredEyebrow: "精选研究",
    featuredTitle: "四种不同的 AI 公司路径，四套可继续追踪的证据网络。",
    featuredAction: "打开档案",
    graphEyebrow: "把关系看出来",
    graphTitle: "公司不是孤立页面，而是一张可以查询的网络。",
    graphDescription: "从 Accel、Lightspeed、General Catalyst、Conviction 等机构展开 portfolio，也可以切换到公司投资人、人物关系、竞品、来源、流量快照或概念证据。",
    graphAction: "进入关系图谱",
    modelEyebrow: "研究知识模型",
    modelTitle: "把网页材料变成可以继续追问的研究资产。",
    modelDescription: "首页展示的是稳定的研究心智，不是底层 schema 清单。主体、关系、证据和判断各有位置，事实不会和分析混在一起。",
    modelLayers: [
      {
        number: "01",
        title: "研究主体",
        types: "公司 / 产品 · 人物 · 投资机构",
        text: "回答我们在研究谁，以及它当前是什么。公司与产品目前共享 company 对象，正文会澄清主体边界。"
      },
      {
        number: "02",
        title: "关系与事件",
        types: "创始关系 · 融资事件 · 批次 / Portfolio",
        text: "回答谁创办谁、谁投了谁、事件在何时发生。融资保留轮次、金额、日期和证据，不只是画一条线。"
      },
      {
        number: "03",
        title: "证据与信号",
        types: "Source · Touchpoint · Traffic snapshot",
        text: "单条来源保存事实证据，触点用于持续监控，流量快照用于比较增长信号；三者不能互相替代。"
      },
      {
        number: "04",
        title: "研究知识",
        types: "Note · Concept · Method",
        text: "人的判断进入 Note，跨公司的模式进入 Concept，多轮复验过的工作方式再进入 Method。"
      }
    ],
    modelFlow: "发现主体 → 收集证据与流量 → 连接人物、资本与竞品 → 形成判断与概念 → 登记触点持续监控 → 沿图谱进入下一轮",
    modelGraphTitle: "一条典型研究路径",
    modelGraphDescription: "点击节点进入真实对象集合；关系图只表达稳定心智，不等同于当前数据库的全部类型与字段。",
    modelNodes: {
      source: "一次性证据",
      traffic: "增长快照",
      touchpoint: "持续触点",
      note: "研究判断",
      company: "公司 / 产品",
      concept: "可复用概念",
      investment: "投资事件",
      investor: "投资机构",
      person: "人物",
      method: "研究方法"
    },
    modelPaths: [
      "Source / Traffic → Company ← Investment → Investor",
      "Company — founders → Person",
      "Touchpoint → Company / Person / Investor",
      "Source → Note → Subject；Company + Evidence → Concept；Note → Method"
    ],
    modelDebtTitle: "当前模型仍在演化",
    modelDebtDescription: "首页只保留最关键边界，完整的数据边界和维护方式收录在公开仓库。",
    modelDebts: [
      "company 当前同时承载公司与产品；主体增多后会评估 product 或 entity kind。",
      "investor 混合 VC、战略投资方和 angel；person 角色会交叉，同一主体也可能具有双重身份。",
      "字段关系是强关系；Markdown body mentions 是弱关系，图谱中不会同权展示。"
    ],
    modelDebtAction: "查看完整数据边界",
    latestEyebrow: "最近更新",
    latestTitle: "研究库仍在持续生长。",
    latestDescription: "更新时间表示对象最近一次整理时间，不等于来源事件发生时间。",
    latestAction: "查看全部公司",
    methodEyebrow: "研究方法",
    methodTitle: "事实、判断和不确定性分开保存。",
    methodDescription: "公开站是研究 vault 的全量投影，不是精选白名单；发布前拦截敏感信息，并为单条结论保留来源、时间、证据等级和抓取边界。",
    methodBoundary: "公开边界：只使用公开或明确授权的资料；公司自报、第三方估算、社区弱信号和研究推断分别标注。未验证的信息不写成事实，凭证、登录态、私密来源和内部原始材料不进入公开产物。",
    methodSteps: [
      ["事实与判断", "source.item 保存证据，note 保存研究判断，traffic.snapshot 保存第三方快照，三者不互相代替。"],
      ["证据与时间", "S1-S4、采集时间、冲突口径和抓取边界共同说明一条来源能支持什么。"],
      ["指标边界", "网站流量不等于用户量或 API 使用量；公司自报、媒体报道和社区情绪分别标注。"],
      ["持续更新", "研究不承诺穷尽或实时，也不构成投资建议；已验证、推断与待验证始终分开。"]
    ],
    repoAction: "查看公开仓库",
    footer: "由人和 agent 持续更新的公开研究 vault，不构成投资建议。",
    noResults: "没有找到匹配公司"
  },
  en: {
    nav: {
      companies: "Companies",
      investors: "Investors",
      graph: "Graph",
      method: "Method"
    },
    eyebrow: "A living, evidence-traceable AI company atlas",
    lead: "Start with a deep company dossier, then follow products, people, capital, growth signals, and research judgments.",
    description: "Built for founders and product, investment, and research practitioners who track the AI market. This is not a news directory or company ranking: it connects companies, founders, investors, financing, product evolution, traffic and GTM, and community feedback into a research network.",
    searchPlaceholder: "Search companies such as Kernel, Sapiom, or Superset…",
    searchAction: "Explore",
    searchHint: "Enter through a company, a research theme, or the relationship graph.",
    topicsLabel: "Explore themes",
    topics: [
      ["Agent Infra", "/companies?filter=category%3Dagent-infra"],
      ["Enterprise Agents / AI Employees", "/companies?filter=category%3Denterprise-agent"],
      ["Agent Payments, Governance & Execution", "/companies?filter=tags%3Dagent-payments"]
    ],
    stats: {
      companies: "Company dossiers",
      objects: "Research objects",
      links: "Structured links",
      updated: "Public snapshot"
    },
    startEyebrow: "How to use it",
    startTitle: "Start with a name, then follow evidence and relationships.",
    startDescription: "This is not a ranking. Every entry connects narrative research, structured fields, sources, and adjacent objects.",
    paths: [
      {
        number: "01",
        title: "Find a company",
        text: "Enter through Agent Infra, enterprise agents, vertical AI, developer tools, or another research theme.",
        href: "/companies",
        action: "Browse companies"
      },
      {
        number: "02",
        title: "Inspect the network",
        text: "Move through investor portfolios, company investors, people-company links, competitors, and adjacent markets.",
        href: "/graph",
        action: "Open the graph"
      },
      {
        number: "03",
        title: "Inspect traffic and growth signals",
        text: "Compare time-bounded traffic snapshots to understand attention and channel structure without treating visits as users.",
        href: "/traffic",
        action: "View growth signals"
      },
      {
        number: "04",
        title: "Verify evidence and judgments",
        text: "Return to source URLs, dates, and evidence levels, then use Notes to distinguish facts from research takeaways.",
        href: "/sources",
        action: "Browse evidence"
      }
    ],
    featuredEyebrow: "Featured research",
    featuredTitle: "Four AI company paths, each with an evidence network to keep exploring.",
    featuredAction: "Open dossier",
    graphEyebrow: "Make relationships visible",
    graphTitle: "A company is not an isolated page. It is part of a queryable network.",
    graphDescription: "Expand portfolios from Accel, Lightspeed, General Catalyst, or Conviction, then switch to company investors, people, competitors, sources, traffic snapshots, or concept evidence.",
    graphAction: "Explore the graph",
    modelEyebrow: "Research knowledge model",
    modelTitle: "Turn scattered web material into research assets that support the next question.",
    modelDescription: "The homepage shows a stable research model, not a raw schema dump. Subjects, relationships, evidence, and judgments remain distinct so analysis does not overwrite facts.",
    modelLayers: [
      {
        number: "01",
        title: "Research subjects",
        types: "Companies / products · People · Investors",
        text: "Defines who or what is being researched. Companies and products currently share the company object, with the dossier clarifying the boundary."
      },
      {
        number: "02",
        title: "Relationships and events",
        types: "Founders · Investments · Batches / portfolios",
        text: "Shows who founded or funded whom and when. Financing retains round, amount, date, and evidence rather than becoming an unlabeled line."
      },
      {
        number: "03",
        title: "Evidence and signals",
        types: "Source · Touchpoint · Traffic snapshot",
        text: "Sources store one piece of evidence, touchpoints support monitoring, and traffic snapshots capture comparable growth signals."
      },
      {
        number: "04",
        title: "Research knowledge",
        types: "Note · Concept · Method",
        text: "Human judgments become Notes, cross-company patterns become Concepts, and workflows become Methods only after repeated validation."
      }
    ],
    modelFlow: "Discover a subject → collect evidence and traffic → connect people, capital, and competitors → form judgments and concepts → monitor durable touchpoints → continue along the graph",
    modelGraphTitle: "A representative research path",
    modelGraphDescription: "Select a node to open real objects. This graph communicates the stable mental model, not every current database type and field.",
    modelNodes: {
      source: "One-time evidence",
      traffic: "Growth snapshot",
      touchpoint: "Durable touchpoint",
      note: "Research judgment",
      company: "Company / product",
      concept: "Reusable concept",
      investment: "Investment event",
      investor: "Investor",
      person: "Person",
      method: "Research method"
    },
    modelPaths: [
      "Source / Traffic → Company ← Investment → Investor",
      "Company — founders → Person",
      "Touchpoint → Company / Person / Investor",
      "Source → Note → Subject; Company + Evidence → Concept; Note → Method"
    ],
    modelDebtTitle: "The model is still evolving",
    modelDebtDescription: "The homepage keeps only the most important boundaries; the public repository documents the full data boundary and maintenance model.",
    modelDebts: [
      "company currently represents both companies and products; product or entity kind may become necessary as the vault grows.",
      "investor mixes VCs, strategic investors, and angels; person roles overlap, and one subject may carry multiple identities.",
      "Field links are strong relationships; Markdown body mentions are weak and are not rendered with equal weight."
    ],
    modelDebtAction: "Read the full data boundary",
    latestEyebrow: "Recently updated",
    latestTitle: "The research vault keeps growing.",
    latestDescription: "Updated time means the object was revised; it is not the date of the underlying event.",
    latestAction: "View all companies",
    methodEyebrow: "Methodology",
    methodTitle: "Facts, judgments, and uncertainty are stored separately.",
    methodDescription: "The public site is a full-vault projection, not a curated allowlist. Publication blocks sensitive material while preserving source, date, evidence level, and capture boundaries for individual claims.",
    methodBoundary: "Public boundary: only public or explicitly authorized material is used. Company claims, third-party estimates, community signals, and research inferences are labeled separately. Unverified information is not presented as fact, and credentials, sessions, private sources, and internal raw material are never published.",
    methodSteps: [
      ["Facts and judgments", "source.item stores evidence, note stores research judgments, and traffic.snapshot stores third-party snapshots."],
      ["Evidence and time", "S1-S4, capture time, conflicting accounts, and collection boundaries show what a source can support."],
      ["Metric boundaries", "Website traffic is not users or API usage; company claims, media reports, and community sentiment remain distinct."],
      ["Continuous research", "The atlas is neither exhaustive nor real-time and is not investment advice; verified, inferred, and unverified claims stay separate."]
    ],
    repoAction: "View public repository",
    footer: "A public research vault continuously maintained by people and agents. Not investment advice.",
    noResults: "No matching companies"
  }
} as const;
