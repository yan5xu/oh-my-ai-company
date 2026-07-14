# Oh My AI Company

**在线浏览：<https://companies.yan5xu.ai>**

Oh My AI Company 是一个持续更新的 AI 公司研究库，覆盖 AI 产品、AI infra、企业 Agent 和垂直 AI 公司。

它不是一组零散的 Markdown 报告，也不是公司排行榜。这个 vault 更接近一张持续生长的 AI company market map：把公司、产品、创始人、投资机构、融资事件、流量信号、社区反馈、媒体报道、竞品关系和研究判断沉淀成可查询、可追溯、可继续扩展的对象网络。

英文一句话：A living atlas of AI companies, products, founders, investors, traffic signals, and research notes.

底层知识库产品是 [Memex](https://github.com/yan5xu/memex)。Memex 是 local-first 的对象图谱知识库：SQLite 存 schema/object/link，Markdown 存正文。你可以把它理解为“结构化数据库 + 可读研究笔记 + 图谱关系”的组合。

公开站点通过 `site/publish.manifest.json` 将整个公开 Vault 同步到独立 Cloudflare D1/R2：所有 type、object、field、Markdown 正文、结构化关系和正文双链保持一致，正文引用的 Vault 资产自动发布。发布流程只拦截密钥、Cookie、本机绝对路径等敏感内容；Memex 本地 Vault 仍是唯一写入源。

## 为什么做这个

AI 产品变化太快，单篇调研报告很容易过期；普通搜索又很难保留上下文。这个 vault 试图解决的问题是：当我们下一次看到一个新公司、融资消息、Product Hunt launch、X thread、中文社区讨论或 Similarweb 流量变化时，不需要从零开始，而是可以沿着已有网络继续往外挖。

这个研究库重点保留几类信息：

- **事实证据**：官网、文档、融资报道、Product Hunt、GitHub、HN、Reddit、X、LinkedIn、中文社区、媒体报道等。
- **结构化关系**：公司和创始人、投资人、投资事件、触点、证据、概念、方法之间的关系。
- **增长信号**：网站流量、来源结构、关键词、社区讨论、launch 节点、媒体传播路径。
- **研究判断**：产品定位、竞品边界、GTM 复盘、风险、待验证问题和个人 takeaway。
- **方法沉淀**：每轮调研如何跑、哪些工具有效、哪些来源容易误导、下一轮应该改进什么。

核心原则是事实和判断分离：`source.item` 存证据，`note` 存人的判断，`traffic.snapshot` 存流量快照，`touchpoint` 存持续监控入口。这样可以避免把 PR 口径、社区情绪和研究结论混在一起。

## 当前覆盖规模

截至 2026-07-13，vault 里已经沉淀：

| 类型 | 数量 | 说明 |
| --- | ---: | --- |
| 公司/产品 | 76 | AI 应用、企业 Agent、browser/agent infra、垂直 AI、开发者工具等 |
| 投资人/投资机构 | 84 | VC、战略投资方、天使投资人、创业者投资人 |
| 人物 | 113 | 创始人、CEO、投资人、记者、关键 operator |
| 持续触点 | 239 | 官网、博客、X、LinkedIn、Product Hunt、GitHub、文档、媒体页等 |

这组对象的价值不在数量本身，而在于它们已经连成了几个可以继续扩展的研究网络：

- **企业 Agent / AI Employee**：Sierra、Harvey、Dust、Viktor、Artisan、Duvo、Hyperagent、Superagent、Tasklet、Ploy、Lace AI、Synthflow AI。
- **Browser / Agent Infra / 自动化执行**：Kernel、Browserbase、Browserless、Hyperbrowser、Browser Use、StableBrowse、Arga Labs、Adept、Exa、Temporal、Resolve AI、Reindeer AI。
- **AI 应用构建 / 开发者工具**：Lovable、Skywork、Gumloop、Superset、VideoTutor、Fal、Together AI、Baseten、Cartesia、Mistral AI、Anthropic、Cognition。
- **垂直 AI**：Harvey、Open Evidence、Eudia、HeyGen、Accrual、Beacon Software、Dwelly、Long Lake、Titan。
- **核心资本与信号源**：Conviction、Lightspeed、General Catalyst、Sequoia、Accel、Andreessen Horowitz、First Round、Leonis、Y Combinator、GIC、Greenoaks、Tiger Global、GV、Benchmark、Kleiner Perkins、Coatue、EQT、OpenAI Startup Fund、NVIDIA Ventures。

这些节点可以帮助研究者快速回答几类问题：某个产品属于什么赛道，谁在投这类公司，相邻竞品是谁，增长是否有流量证据，创始人和媒体网络是否能解释传播路径，以及下一轮应该从哪条线继续挖。

## 界面预览

公司档案：

![Memex company research example](assets/readme/memex-company-superset-research.png)

投资机构 portfolio 图谱：

![Memex portfolio graph example](assets/readme/memex-portfolio-lightspeed.png)

## 如何阅读这个 vault

你可以直接浏览 `bodies/` 里的 Markdown 文件，也可以用 Memex CLI 或 Web UI 查询结构化关系。

常见入口：

- `bodies/company.*.md`：公司/产品档案。
- `bodies/source.*.md`：单条证据来源摘要。
- `bodies/note.*.md`：研究判断、takeaway、调研复盘。
- `bodies/traffic.*.md`：网站流量和增长信号。
- `bodies/method.*.md`：调研方法和流程反思。
- `memex.graph-views.json`：图谱视图配置，例如公司全景、投资机构 portfolio、人物网络、证据图谱。

对象 ID 通常形如：

```text
company.browserbase
investor.lightspeed-venture-partners
person.winston-weinberg
source.producthunt.superset
traffic.similarweb.harvey-2026-h1
```

Markdown 正文里的 `[[company.browserbase]]` 这类双链会被 Memex 解析成关系，便于从一个对象追到相关公司、人物、投资机构、证据和笔记。

## 本地运行

先安装或构建 [Memex](https://github.com/yan5xu/memex)，确保 `mmx` 在你的 `PATH` 中。然后在本仓库根目录运行：

```bash
export VAULT=$(pwd)
mmx -C "$VAULT" status
mmx -C "$VAULT" issues
```

健康状态应为 `issues` 返回 `count: 0`。

启动 Web UI：

```bash
mmx -C "$VAULT" serve --addr 127.0.0.1:8765
```

打开：

```text
http://127.0.0.1:8765
```

## 常用查询

查看 schema：

```bash
mmx -C "$VAULT" type list
mmx -C "$VAULT" field list company
mmx -C "$VAULT" field list source.item
```

查公司：

```bash
mmx -C "$VAULT" query company --where 'title=Browserless' --select id,title,website,tags
mmx -C "$VAULT" get company.browserless --body-preview 800
mmx -C "$VAULT" backlinks company.browserless
```

查某公司的证据：

```bash
mmx -C "$VAULT" query source.item \
  --where 'about_company=company.browserless' \
  --select id,title,platform,evidence_level,quality
```

查某公司的流量快照：

```bash
mmx -C "$VAULT" query traffic.snapshot \
  --where 'company=company.browserless' \
  --select id,domain,monthly_visits,total_visits,period_start,period_end
```

查投资机构 portfolio 图谱：

```bash
mmx -C "$VAULT" graph query --view portfolio --center investor.lightspeed-venture-partners
```

## 图谱视图

Graph v2 配置在 `memex.graph-views.json`。常用视图包括：

- `company-research-map`：公司全景，包含证据、笔记、触点、流量、创始人、投资人、概念和方法。
- `company-evidence`：公司证据库。
- `company-traffic`：公司流量快照。
- `portfolio`：投资机构 portfolio。
- `investor-map`：投资机构全景。
- `person-network`：人物网络。
- `concept-evidence`：概念/模式证据。
- `source-trail`：从单条 source 追溯到主体、笔记、投资关系和方法。

查看和验证图谱视图：

```bash
mmx -C "$VAULT" graph view list
mmx -C "$VAULT" graph view validate --file memex.graph-views.json
mmx -C "$VAULT" graph query --view company-research-map --center company.browserless
```

## X 监控列表

研究过程中发现的高价值 X 账号，会同步到 X list 里做持续监控：

| List | 用途 | URL |
| --- | --- | --- |
| `AI Product` | AI 产品/公司官方账号。用于监控 launch、产品更新、客户互动和传播反馈。 | https://x.com/i/lists/2074319950106497342 |
| `AI Founder` | AI 公司创始人、CEO、核心 operator。用于监控 founder narrative、融资/发布节点、招聘和市场判断。 | https://x.com/i/lists/2074309338932576685 |
| `AI Media` | AI/startup 记者、编辑、核心媒体节点。用于监控叙事扩散、报道来源和关键媒体人网络。 | https://x.com/i/lists/2074809210010050753 |

这些列表是 vault 的外部阅读入口；vault 里的 `touchpoint` 是结构化监控入口。两者配合使用，可以把一次调研变成后续持续观察。

## 数据边界

这个 vault 是研究资产，不是完整商业数据库，也不是投资建议。

- 信息会随时间过期，尤其是融资、流量、团队规模、定价、客户和产品能力。
- 部分数据来自第三方估算或公开报道，正文中会尽量保留来源和证据等级。
- 媒体报道、公司 PR、社区反馈和 Similarweb 类流量数据都有各自偏差，需要交叉验证。
- 如果某个页面抓不到正文、来源不稳定或信息冲突，应该在对应 `source.item` 或 `note` 中标注不确定性。

欢迎把它当作一个可复用的研究地图，而不是最终结论。

## 仓库结构

```text
.
├── .memex/memex.db          # SQLite：type、field、object、link
├── bodies/                  # Markdown body：公司报告、source 摘要、note、method
├── assets/                  # 图片、截图、官网素材、研究配图
├── memex.graph-views.json   # Graph v2 视图配置
├── AGENTS.md                # 给 AI agent 看的运行手册
└── README.md                # 给人看的项目说明
```

不要手动编辑 `.memex/memex.db`。日常读写建议走 `mmx`；长文内容可以直接改 `bodies/*.md`，但改完需要运行 `body refresh`。

## 写入示例

新增公司：

```bash
cat <<'EOF' | mmx -C "$VAULT" upsert company company.example \
  name="Example" \
  title="Example" \
  status=active \
  website="https://example.com" \
  tags=ai-agent,developer-tool \
  --body-stdin
# Example

一句话介绍、产品判断、证据链接和分析。
EOF
```

新增证据：

```bash
cat <<'EOF' | mmx -C "$VAULT" source add source.example-home \
  --title "Example homepage" \
  --url "https://example.com" \
  platform=Website \
  item_type=profile \
  evidence_level=S1 \
  quality=full \
  about_company=company.example \
  --body-stdin
官网正文摘要、关键事实、抓取状态和证据边界。
EOF
```

新增判断笔记：

```bash
cat <<'EOF' | mmx -C "$VAULT" upsert note note.example-takeaway \
  title="Example 产品 takeaway" \
  kind=takeaway \
  author=researcher \
  about_company=company.example \
  created_at=2026-07-13 \
  --body-stdin
人的判断写这里。事实和判断分开；不确定的地方标注待验证。
EOF
```

刷新正文双链并检查：

```bash
mmx -C "$VAULT" body refresh company.example
mmx -C "$VAULT" issues
```

## 参与和反馈

如果你发现事实错误、来源失效、分类不准确，或者希望补充某家公司/投资机构/研究线索，欢迎通过 issue 或 pull request 反馈。

比较有价值的贡献包括：

- 补充一手来源链接，而不是只给二手转述。
- 标注数据时间点，例如某次流量快照、融资报道、团队规模或定价页面的日期。
- 区分直接竞品、相邻产品、客户所在平台和搜索噪声。
- 把判断写成 note，把证据写成 source，避免两者混在一起。
