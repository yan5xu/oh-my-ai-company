# 产品调研工作流 v0

这不是最终 SOP，只是我们在调研 [[company.superset]]、[[company.ploy]]、[[company.arga-labs]]、[[company.lightsprint]]、[[company.tasklet]]、[[company.hyperagent]] 时形成的当前工作记录。等样本更多、流程更稳之后，再考虑固化成正式方法。

## 核心顺序

1. 先建主体骨架：公司、创始人、官网、YC 页面、X、LinkedIn、Product Hunt、GitHub、社区入口。先把对象和触点挂上，不急着写长文。
2. 再补单条证据：YC profile、launch page、官网页面、融资报道、社区帖子、Similarweb 截图、LinkedIn 员工页、视频/播客转录等，都进入 `source.item`。
3. 然后判断产品层：它解决什么问题、位于哪一层、和已有工具差在哪里、适合什么客户、是不是只是 demo 还是闭环产品。
4. 再看增长和 GTM：什么时候 launch、在哪些平台放大、有没有 HN / PH / YC / X / V2EX / linux.do / Reddit 反馈、Similarweb 流量是否支撑叙事。
5. 把人的判断拆成 `note`：CP takeaway、产品 takeaway、GTM takeaway、疑问、风险，不要埋在公司正文里。
6. 把可复用模式抽成 `concept`：例如 [[concept.public-launch-as-elevator-pitch]]、[[concept.network-led-launch]]、[[concept.agent-validation-layer]]。concept 不是 tag，必须有解释和可迁移性。
7. 最后反推工具缺口：哪个平台抓不到、哪里需要 adapter、哪里需要截图/DOM 截图/正文抽取/转录/流量采集能力。

## Tasklet 补出来的方法增量

Tasklet 不是从零调研，而是把旧 radar 材料整理进 Memex，因此补出了几块之前覆盖不够的方法。

### 旧资料再审计

历史材料不能直接搬。每篇旧文都要重新判断：

- 它的原始来源是什么，是否还能打开。
- 是事实、摘录、翻译、总结，还是研究者判断。
- 有没有重复段落、格式混乱、来源缺失、旧结论过强的问题。
- 是否应该拆成 `source.item`、`note`、`concept`，而不是整篇塞进公司正文。

Tasklet 这次的清理记录见 [[note.tasklet-source-cleanup]]。

### Release notes 时间线

如果一个产品有完整 release notes，要把它当作产品演化主线，而不只是普通来源。Tasklet 的 release notes 能还原从 beta、v2 agents、sandbox VM、integrations、Instant Apps、triggers、Agent Browser 到 Teams 的节奏，因此比单看官网更能解释“它怎么长到现在”。

这类时间线适合沉淀为一组 `source.item`，每个 release 是一个证据点，再在公司正文里重建 timeline。

### 创始人访谈/播客挖掘

Founder podcast / interview 不是普通 PR。它常常能解释官网不会写清楚的战略判断、产品哲学和竞争认知。Tasklet 的 Cognitive Revolution 两期访谈提供了：

- agent-first workflow
- files are the agent
- model-neutral horizontal platform
- Anthropic 既是供应商也是竞争对手

这些内容应拆成强证据 source.item，再抽成 `concept` 和 `note`。对应来源：[[source.podcast.tasklet-cogrev-ep1]]、[[source.podcast.tasklet-cogrev-ep2]]。

### 口径冲突表

融资、ARR、team size 这类数字经常冲突。方法上不要急着“统一口径”，而是按来源保留：

- 官方/YC 写什么。
- 第三方数据平台写什么。
- 招聘页或数据库字段写什么。
- 社媒/社区写什么。

Tasklet 的 $5M ARR、$10M ARR、$20M round、$29.5M funding、team 8/9/10 都必须分开记录。对应判断见 [[note.tasklet-scale-and-traction]]。

### 抓取失败也入库

抓不到正文不是“没有发生”。如果页面存在但只返回 security verification、cookie、导航或极短内容，要建成 `source.item` 并标记 `empty_shell` / `partial`，说明它不能作为结论证据。

Tasklet 的 Product Hunt 是 `empty_shell`，HN 是 `partial`。这能反推工具缺口，也能避免下次重复以为“还没查过”。

### 竞品启发单独抽取

如果调研对象和我们自己的产品相关，除了产品/GTM takeaway，还要单独抽 `competitive_learning`。Tasklet 对 Parall 相关启发包括 cloud sandbox、browser、triggers、team workspace、agent OS、Instant Apps。它们不是单纯事实，而是可迁移的产品设计素材。

## Hyperagent 补出来的方法增量

Hyperagent 这次不是“搜不够”的问题，而是暴露了调研收尾和证据状态管理的问题：Product Hunt 一开始返回安全验证，后来可以打开；Similarweb 公网页显示无数据，但完整 Similarweb 数据视图能看到完整流量。方法上要把“抓取失败”和“源本身无数据”分开。

### 核心平台要二次复查

重要平台第一次抓不到，不能直接写进最终判断。收尾前要对核心平台做一次 retry checklist：

- Product Hunt：launch 页面、rank、points、followers、maker/hunter、评论区。
- Similarweb：必须优先走完整 Similarweb 数据视图，不用公开页下结论。
- LinkedIn：公司页、关键人、员工/转发关系，能抓多少写多少，抓不到要标边界。
- X：官方账号、关键 thread、founder/产品账号是否进 list。
- 官网/文档/terms：确认主体、运营公司、服务边界。

抓取失败可以暂存为 `empty_shell`，但如果后续拿到正文，要替换旧失败对象，避免 graph 里长期残留过时结论。

### Similarweb 必须走完整 Similarweb 数据视图

流量、渠道、地域、相似站点、关键词这些判断，优先用 Similarweb。公开 Similarweb 页只适合兜底，不能用来得出“没有数据”的结论。

报告里写 Similarweb 时要区分：

- 量级：总访问/月访问/月独立访客。
- 渠道结构：direct、organic、paid、social、referral、AI traffic。
- 地域：是否美国为主，是否有异常国家。
- 社交来源：YouTube/Reddit/X/LinkedIn 占比，判断解释型产品靠什么传播。
- 关键词：品牌词、竞品词、相邻需求词。

绝对数字按第三方估算处理；渠道结构和趋势通常更有判断价值。

### Product Hunt 是 launch/GTM 证据，不只是打榜

Product Hunt 不只看“有没有上榜”。它反映的是产品如何做 public launch 和一句话叙事。

固定看：

- launch 时间；
- rank / points / followers；
- tagline 和描述；
- maker / hunter / launch team；
- 评论区真实问题；
- 和官网/X/媒体叙事是否一致。

Superset 的 Product Hunt 体现了资源放大器；Superagent 的 Product Hunt 更像 Airtable standalone agent 产品线的一次外部分发节点。两者都不能简单套同一种解释。

### 大公司内部产品要先澄清主体关系

遇到 Airtable / Superagent / Hyperagent / Field Agents / DeepSky 这种情况，不能一上来就把所有材料塞到同一个 company。先加一节“主体关系澄清”：

- 目标对象到底是产品、公司、产品线，还是母公司的一个功能？
- 母公司、收购资产、旧产品、新产品之间是什么关系？
- 哪些数据能归到本主体，哪些只能说明母体产品线？
- 哪些人是 founder，哪些只是 CEO、operator、产品负责人、作者或投资人？

Memex 强字段会影响 graph，不能把弱关系硬塞进去。Hyperagent 这次就不应该把 Howie Liu 写入 `founders` 字段；他应作为 Airtable CEO/co-founder 和关键推动者出现在正文事实边界里。

### 强关系进字段，弱关系进正文/note

字段关系只放强事实：

- `founders`：必须有明确 founder/co-founder 证据。
- `investor/investment`：必须有融资或投资记录。
- `touchpoint`：持续入口，不是一篇文章。
- `source.item`：单条证据，不是长期账号。

弱关系，例如“关键推动者”“访谈对象”“媒体人关注”“可能相邻竞品”“同母体产品线”，先放正文或 `note`。等证据变强，再升级为字段关系。

### 视觉证据纳入标准动作

产品调研不能只存文字。至少尝试保存：

- 官网 hero 或产品 UI 截图；
- demo / video / X thread 关键画面；
- 文章配图和 case study 图；
- Product Hunt 或 launch page 截图。

Agent / browser 产品尤其需要图像证据，因为“它怎么跑”“用户看见什么”“执行过程是否可信”很难只靠文字解释。

### 收尾前做证据状态复核

每次报告收尾前固定检查：

- 是否有 `empty_shell` / `metadata_only` 被后续可用证据替代；
- 主体报告里有没有旧失败结论残留；
- Similarweb 是否走了完整 Similarweb 数据视图；
- Product Hunt / LinkedIn / X 是否至少 retry 一次；
- 强字段关系是否过度断言；
- 官网截图/核心视觉资产是否补了；
- 相关账号是否进入 X list；
- `mmx issues` 是否为 0；
- 是否补了 `note`，把人的 takeaway 从公司正文里抽出来。

Hyperagent 的修正见 [[note.hyperagent-product-takeaway-2026-07-10]]。

## 当前有用的判断维度

- 产品规模：团队规模、融资、流量、社区讨论、GitHub/PH/HN 反馈，不只看一句 positioning。
- 产品层级：是单点工具、工作流、平台层、验证层、增长操作系统，还是团队协作层。
- 传播质量：每次公众传播都当作 Elevator Pitch，看叙事、案例、视频、demo、评论反馈。
- 分发路径：YC、创始人履历、投资人网络、PH/HN/X/社区、SEO/AEO、LinkedIn 员工网络。
- 证据质量：官方资料是 S1，媒体/融资/平台数据是 S2，社区反馈是 S3，抓不到正文或 metadata-only 必须明确标注。
- 演化证据：release notes、changelog、docs updates、demo video 能解释产品如何一步步长出来。
- 创始人战略口径：访谈、播客、长 thread 适合提炼产品哲学和竞争判断，但要和官网事实分开。
- 口径冲突：不要为了报告好看而统一数字；按来源保存冲突本身。
- 竞品启发：和我们相关的公司，要额外记录它对我们产品/运营/工具建设的启发。
- 主体关系：大公司内部产品、收购资产、产品线、母公司之间先澄清边界，再写字段关系。
- 视觉证据：复杂产品必须有截图/配图/Demo 画面，否则后续复读会丢失产品感。
- 证据状态：抓不到、暂时抓不到、源本身无数据是三种状态，不能混写成结论。

## Memex 落法

- `company/person`：主体和人物骨架。
- `touchpoint`：持续入口，例如官网、X 账号、YC company page、LinkedIn company page。
- `source.item`：一次性证据，例如某篇文章、某条 launch、某次 Similarweb snapshot、某个 HN 帖子。
- `note`：人的判断，尤其是 CP takeaway 和研究 takeaway。
- `concept`：可跨公司复用的产品模式、GTM 模式、市场判断。
- `method`：我们怎么调研、怎么采集、怎么落库、怎么反推工具缺口。

## 当前问题

- source.item 的正文质量还不稳定，有些只是 metadata-only，需要后续补正文抓取。
- 图片素材还没有变成习惯动作，未来应把官网图、demo 图、截图、文章配图纳入材料。
- 社区反馈还需要更系统地覆盖 Reddit / HN / V2EX / linux.do / X。
- Similarweb、Google Trends、Product Hunt、LinkedIn 的采集方式还需要继续产品化；其中 Similarweb 已明确应优先走完整 Similarweb 数据视图。
- 对 release notes / changelog 的抓取还没有形成工具化入口。
- 播客/视频的转录、分段、观点抽取还需要更稳定地进入 `source.item`。
- 方法还在练兵阶段，不应过早写死成模板。

## 2026-07-13 Hyperbrowser 调研补充

本轮对象：[[company.hyperbrowser]]。相关记录：[[note.hyperbrowser-product-takeaway-2026-07-13]]、[[note.hyperbrowser-research-run-2026-07-13]]。

新增方法经验：
- 对 browser-agent / agent-infra 公司，官网不够，必须读 docs index 和 API reference；真实产品边界通常藏在 docs 里。
- 产品面要按层拆：session/browser pool、web data API、agent action layer、MCP/tool gateway、sandbox/runtime、pricing/compliance。
- GitHub 不只看 stars，要看 repo portfolio：examples、SDK、MCP、framework、eval/sandbox 周边分别对应不同 GTM 入口。
- 社区反馈要降级：Reddit/HN 适合发现风险和真实摩擦，不能直接当规模证据。
- 中文渠道要区分泛工具内容流和真实开发者采用。公众号/小红书能说明认知扩散，linux.do/v2ex/HN/Reddit 更适合找开发者踩坑。
- Similarweb 不可用时只记录失败原因和公开弱信号，不做流量结构判断。

## 2026-07-13 Browser Use 调研补充

本轮对象：[[company.browser-use]]。相关记录：[[note.browser-use-product-takeaway-2026-07-13]]、[[note.browser-use-research-run-2026-07-13]]、[[traffic.similarweb.browser-use-2026-01-2026-06]]。

新增方法经验：
- 开源驱动产品要把 GitHub repo/org 作为一等证据；stars、forks、repo portfolio、license、更新频率都影响 GTM 判断。
- 对 browser-agent 产品，docs 对象模型比官网更重要：Task、Session、Browser、Profile、Agent、Model 能暴露真实产品边界。
- Similarweb similar sites 要人工分层，尤其开源/AI 工具容易混入目录站、大平台、同名噪声。
- 社区负反馈是开源产品商业化的关键证据：安装难、慢、循环、登录态、反 bot、长任务失败往往决定 Cloud 付费机会。

## 2026-07-13 Browserless 调研补充

本轮对象：[[company.browserless]]。相关 takeaway：[[note.browserless-product-takeaway-2026-07-13]]；流程反思：[[note.browserless-research-run-2026-07-13]]。

这轮补了一个“老牌基础设施公司”的调研路径：

- 不能只看官网最新 AI agent 话术，要追早期 HN、创始人访谈、官方技术债文章，找出原始需求。
- 对 browser/agent infra，公司可能从 scraping/testing/PDF 进入 AI agent，不应按最新页面一句话直接分类。
- Similarweb similar sites 要分层：直接竞品、传统邻近、AI 新叙事邻近、噪声。Browserless 的相似站点更偏 scraping/proxy/browser automation，不是纯 agent browser。
- 创始人账号要防同名误伤：LinkedIn/X 搜到同名 Joel Griffith，但与 Browserless 不符，改用 GitHub profile + 官方/访谈验证。
- 官网 browser read 失败不等于官网不可用，可以用子页面 read、curl meta、截图交叉补证；但 source 里必须标明主页正文抓取失败。
- Similarweb overview 的关键数值有时 snapshot 不全，固定补 `document.body.innerText`。
- 图像资产不只截图，也下载官网 social preview/logo/favicon，增强 body 可读性。

## 2026-07-13 Kernel 调研补充

Kernel 这轮与前面的 Browserbase、Hyperbrowser、Browserless 对照后，补出了三条还需要继续验证的方法。相关过程见 [[note.kernel-research-run-2026-07-13]]。

### 这轮质量较高的原因

后续可以参考 Kernel 的证据闭环，但不要复制它的报告目录。真正值得复用的是以下过程：

- **从已知图谱进入**：先和 Browserbase、Hyperbrowser、Browserless 对照，带着明确缺口查 Kernel，而不是从搜索结果重新堆一遍公司介绍。
- **产品、规模、演化并行**：官网/docs 回答“现在卖什么”，流量与客户用量回答“做到多大”，launch/release/founder vision 回答“如何走到这里、准备往哪里走”。三条线互相校正。
- **关键结论至少跨两类证据**：官方叙事之外，尽量补平台数据、客户案例、GitHub 或社区反馈；融资稿、供应商案例和第三方估算都保留各自边界。
- **把失败状态继续追到可解释**：首页空壳、Reddit 搜索异常、LinkedIn 员工误报都没有停在“工具失败”，而是复测、反馈工具 owner、修复后回填证据状态。未解决的 GitHub star history 和产品实测则明确留空。
- **研究结果与研究过程一起资产化**：主体报告、source、人物/投资关系、流量快照、图片、note、concept、监控入口和本轮反思同时落库，使下一家公司可以直接复用比较基线。

这组动作更适合被理解为“质量控制回路”，而不是固定模板。垂直 AI、消费产品或开源项目仍应按其真实问题增删证据线。

### API-first infra 的规模必须双轨判断

网站流量衡量的是外部注意力与获客，不等于 API/backend 使用。研究 browser、sandbox、模型服务等 infra 时，至少并列观察：

- 网站 visits、渠道、地域与关键词；
- API calls、browser sessions、任务数、并发或官方使用规模；
- 客户案例中的单工作流量级、成功率和节省；
- GitHub issues/SDK activity、团队增长和岗位结构。

[[company.kernel]] 的官网半年约 15 万 visits，但 Benny 官方案例单月约 88 万 browser sessions。不能用前者否定后者，也不能因为后者来自供应商就不标证据边界。

### Launch 应还原成 sequence

不要只找一个 launch date。Kernel 的 2025 年传播至少分为：开源技术 artifact -> YC 产品视频 -> 融资/路线图。每个节点服务不同目标，并且内容具体度会显著改变社区反馈。

### 最新 founder vision 用来识别产品上移

官网适合确认当前 offer，docs 适合确认能力，founder vision 适合发现公司准备控制的下一层。Kernel 从 cloud browser 延伸到 [[concept.sanctioned-agent-identity]]，如果只读首页和 pricing，会漏掉真正的战略竞争面。

## 2026-07-14 Tolmo 调研补充

本轮对象：[[company.tolmo]]。相关记录：[[note.tolmo-product-takeaway-2026-07-14]]、[[note.tolmo-competitor-map-2026-07-14]]、[[note.tolmo-research-run-2026-07-14]]。

这轮只增加两项尚待更多样本验证的方法：

### Invite-only 产品继续找机器界面

App 无法进入不等于只能读官网。优先检查：

- `/llms.txt`、API reference 和公开 docs；
- CLI、package、binary release 与 `--help`；
- Skill、MCP、tool schema 和 telemetry；
- Demo 字幕与公开 sample；
- 未认证状态下哪些命令可用、哪些明确要求 token。

公开 CLI 的 command surface 能验证产品是否真的存在，也会暴露官网没有写出的 finding lifecycle、secure proxy、权限和审计能力。但未登录验证不能冒充真实生产测试。

### 对照“权限承诺”和实际动作表面

Agent/安全产品常在首页写 read-only 或 safe-by-default。调研时应拆成五层逐项核验：

1. 数据源读取权限；
2. 凭据是否在服务端代理；
3. 产品自身控制面能否写入；
4. 是否能修改外部系统；
5. 是否会让 coding agent 执行代码或基础设施变更。

如果首页承诺与 docs/CLI 的实际能力范围不同，应记录为权限边界问题，而不是直接判定其说法虚假。Tolmo 的 read-only integration 与 finding/monitor/proxy/remediation commands 就需要这样分开理解。

## 2026-07-14 Sapiom 调研补充

本轮对象：[[company.sapiom]]。过程记录：[[note.sapiom-research-run-2026-07-14]]；产品判断：[[note.sapiom-product-takeaway-2026-07-14]]。

回看 Kernel、Browserless、Browser Use、Hyperbrowser 与 Tolmo 后，本轮只增加两项候选动作，不把它们写成所有公司必跑模板。

### 一体化平台要做 layer maturity audit

把首页中的产品层逐项列出，再对照首次发布时间、docs/API/package、可实测范围、真实使用证据和营销承诺。Sapiom 的 gateway 已迭代数月，新的 agent runtime 只发布数天；统一首页不等于统一成熟度。

### 把社区 objection 映射到 control surface

对支付、治理、安全或权限产品，社区讨论不应只摘要成“用户担心风险”。把 spend、retry、new capability approval、不可逆交易、身份和审计等 failure mode 逐项映射到公开控制面，区分已经实现、只在叙事中出现和暂未验证。

这两项目前来自单轮强样本，需要在更多 Agent payment/governance/runtime 产品中复验。
