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

## 2026-07-15 Raft 调研补充

本轮对象：[[company.raft]]。产品判断：[[note.raft-product-takeaway-2026-07-15]]；过程记录：[[note.raft-research-run-2026-07-15]]。

回看 Helio、Kernel 等前几轮后，本轮只增加六个候选动作，暂不升级为全品类固定模板：

- **品牌迁移连续性**：公司改名时同时查旧名、旧域、旧账号、旧关键词和 referral，按月拼接流量与传播节点。
- **官方指标自洽审计**：核定义、样本、发布日期、截止日和指标是否真正代表价值；活跃 Agent 数不能替代合格交付物。
- **Dogfooding 证据阶梯**：区分“声称自用”、展示真实工作项、角色分离、独立验证、不可逆 human gate 和实际发布结果。
- **隐藏融资反查**：数据库为空后，沿投资人播客、portfolio、创始人关系和社区线索扩张；只有直接表述才建强投资关系，未知金额/轮次留空。
- **社区反证映射控制面**：把重复劳动、成本、权限、偏航等 objection 映射到产品机制；产品有回应不等于问题已被证明解决。
- **视觉证据混合**：组合 DOM 截图、官方高清产品图和线下真实照片，不让报告只剩官网营销画面。

Raft 是第一个同时强烈暴露 rebrand、官方新指标和横向多 Agent 反方论证的样本。后续出现第二个同类样本后，再判断哪些动作值得固化。

## 2026-07-15 Bloome 调研补充

本轮对象：[[company.bloome]]。产品判断：[[note.bloome-product-takeaway-2026-07-15]]；过程记录：[[note.bloome-research-run-2026-07-15]]。

回看 Moxt、Floatbot 和 Raft 后，只增加四个当前可复用动作：

- **多阶段 launch**：把邀请制内测、商店上架、官方发布、活动/大使扩散分别记为节点；它们回答的不是同一个问题。
- **内容权重审计**：平台搜索命中产品链接后必须打开全文，区分 dedicated review、案例植入和文末 CTA，不把整篇互动错误归因给产品。
- **动态图表自洽校验**：读取 Highcharts 后，用页面 total、最新月 MoM、时间范围和域名再次验证；图表仍在更新时不落数。
- **官方结构化元数据兜底**：App Store 等页面因地区跳转或动态渲染抓不到时，优先使用平台官方 lookup/API；空壳页面本身不能证明应用不存在。

## 2026-07-15 Lindy 调研补充

本轮对象：[[company.lindy]]，历史主体：[[company.teamflow]]。产品判断：[[note.lindy-product-takeaway-2026-07-15]]；过程记录：[[note.lindy-research-run-2026-07-15]]。

回看 Ema、Relevance AI 与本轮材料，新增五个候选动作：

- **前台/底座双读**：首页定位回答当前卖什么，完整 docs 回答平台仍能做什么；二者不一致时先判断产品分层，不急着写成 pivot。
- **资本连续性审计**：rebrand/pivot 后沿原公司公告、投资人 portfolio 和精确轮次重建融资，不把历史累计金额搬到新产品时间线。
- **外部副作用审计**：对发信、建会、改记录、付款等动作，固定查授权来源、独立 validator、HITL、豁免、audit 与 eval。
- **模型迁移质量链**：记录 offline eval、small live rollout、长期 retention、回滚与成本；离线通过不等于线上可用。
- **重复 launch 序列**：把同一产品的多次 Product Hunt/公开发布看作连续发行，比较每次 Elevator Pitch、榜单、渠道和后续流量，而不是只保存一次首发。

Lindy 只提供一个“成品助理入口 + 平台底座”样本。后续 11x、Artisan 或同类产品出现第二个可比样本后，再决定是否固化。

Bloome 还再次验证了主体边界：共享 founder、员工和开发者账号只说明组织连续性，不能自动迁移另一个产品的融资、团队规模或经营数据。

## 2026-07-14 Skyfire 调研补充

本轮对象：[[company.skyfire]]。过程记录：[[note.skyfire-research-run-2026-07-14]]；产品判断：[[note.skyfire-product-takeaway-2026-07-14]]。

这轮针对 identity/payment/trust 产品补出四项检查：

- 产品不能只看授权和支付接口，必须沿 `authorization → charge/settlement → dispute/liability` 走完整闭环。
- 合作网络按 protocol member、integration partner、demo、customer、investor 分层；官网 logo 默认不是客户证据。
- 旧融资报道、当前官网和最新 docs 要并排读，产品 repositioning 与能力口径冲突本身就是证据。
- 社区先行能降低官网叙事偏差；没有聚焦讨论只能写“公开样本薄”，不能写成无人使用。

本轮还验证了：支付产品的真正壁垒可能从 rail 转向 identity、access 和 policy enforcement，但是否形成独立品类仍需更多样本。

## 2026-07-14 Clink 调研补充

本轮对象：[[company.clink]]。过程记录：[[note.clink-research-run-2026-07-14]]；产品判断：[[note.clink-product-takeaway-2026-07-14]]。

这轮针对支付、MoR、Billing 与 Agent commerce 产品补出四项检查：

- **Operating contract audit**：不能只读首页和 API。Terms、Fee Schedule、payout、Reserve、chargeback、退款、税务与 liability 才能说明支付公司实际承担什么、把什么留给商户。
- **Root vs subdomain traffic audit**：marketing root、docs、dashboard、checkout 与 API 子域分别承载不同信号。遇到总量和参与度冲突，先检查 includeSubdomains，再判断数据质量。
- **Public-access smoke**：对“open beta”“public access”“self-serve”必须实际点击 CTA，记录是生产还是 UAT、是否邀请码、是否 KYC、能否生成 key；不可只复述新闻稿。
- **Referral semantics**：支付/infra 产品的外链可能是媒体阅读，也可能是 merchant checkout、支付跳转和 return URL。结合双向 domain、outbound destination 和产品节点判断，但不得直接换算成客户、订单或 GMV。

本轮还形成候选概念 [[concept.merchant-agent-readiness]]：Agent commerce 不只需要买方 wallet，也需要商户的 discovery、Skill、usage billing、authorization、fulfillment 与 audit 闭环。

## 2026-07-13 Hyperbrowser 调研补充

本轮对象：[[company.hyperbrowser]]。相关记录：[[note.hyperbrowser-product-takeaway-2026-07-13]]、[[note.hyperbrowser-research-run-2026-07-13]]。

新增方法经验：
- 对 browser-agent / agent-infra 公司，官网不够，必须读 docs index 和 API reference；真实产品边界通常藏在 docs 里。
- 产品面要按层拆：session/browser pool、web data API、agent action layer、MCP/tool gateway、sandbox/runtime、pricing/compliance。
- GitHub 不只看 stars，要看 repo portfolio：examples、SDK、MCP、framework、eval/sandbox 周边分别对应不同 GTM 入口。
- 社区反馈要降级：Reddit/HN 适合发现风险和真实摩擦，不能直接当规模证据。
- 中文渠道要区分泛工具内容流和真实开发者采用。公众号/小红书能说明认知扩散，linux.do/v2ex/HN/Reddit 更适合找开发者踩坑。
- Similarweb 不可用时只记录失败原因和公开弱信号，不做流量结构判断。

## 2026-07-15 Relevance AI 调研补充

本轮对象：[[company.relevance-ai]]。产品判断：[[note.relevance-ai-product-takeaway-2026-07-15]]；过程记录：[[note.relevance-ai-research-run-2026-07-15]]。

回看 Ema、Raft、Bloome 与 Hyperbrowser 后，本轮只增加五个候选动作：

- **产品演化三点对照**：把历史融资定位、早期 launch pitch 和当前官网并排，避免把 current positioning 倒推成公司一直如此。
- **客户证据 attribution gate**：客户确认平台采用，不代表客户披露的全部业务指标都由该平台单独贡献；供应商案例、客户侧采用和可归因 ROI 分三层。
- **官网动态数字审计**：动态图中的 task、cost、pass rate 先判断是 demo、样本还是全局运营指标；没有定义就不进入规模结论。
- **平台能力读限制条款**：对 security、eval、MCP、OTEL、pricing 不只摘功能，优先记录 detect-only、export-only、single-tenant in progress、timeout 与 queue 等反面边界。
- **同名实体校验**：Product Hunt、LinkedIn、X 搜索命中后必须核 domain、maker、handle 和时间；Relevance AI 本轮排除了一个 2020 年同名 PH 产品。

本轮还验证了 search → detail 的平台闭环：小红书高互动结果只有打开正文后，才能区分“真实用 Relevance AI 搭建”与泛工具清单；互动量说明分发，不自动说明产品深度和留存。

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

## 2026-07-14 PayInsider 调研补充

本轮对象：[[company.payinsider]]。产品判断：[[note.payinsider-product-takeaway-2026-07-14]]；过程记录：[[note.payinsider-research-run-2026-07-14]]。

这轮只增加五项候选动作，不把支付公司的路径硬套到其他类别。

### 营销域和产品域分开审计

B2B 支付、API 和基础设施产品的真实访问可能发生在 `app`、`merchant`、`checkout`、`sandbox` 或 SDK 子域。官网没有流量不能直接推成产品没有使用；产品域的 Checkout 流量也不能直接推成商户数。报告必须写清域名范围和可解释对象。

### 动态 CTA 是产品真实性证据

对免费试用、Get Started、Book Demo 继续追一层：它调用什么接口、返回哪个环境、是否有真实注册表单、是否要求邀请码。临时 token、验证码和会话凭证不进入资料库。

### 公开前端包只证明能力面

当后台未登录时，公开 JS 路由、模块和 API 名称可用于确认产品结构，但不能证明功能生产可用、稳定、被客户采用或产生收入。把“实现证据”和“采用证据”分开。

### 撤下页面按历史信号处理

Sitemap、SSR 正文或缓存可能暴露旧定价和旧产品。若客户端已跳 404、页面已下线或口径冲突，降级为 stale/withdrawn，不能当当前报价；它仍可帮助理解曾经的套餐设计和销售模型。

### 产品版本与法律主体交叉核验

Version Log、Wayback 资源、隐私更新时间与公司成立日期如果不一致，保留冲突并继续找前置主体、技术资产或合同迁移证据。不要为了让故事顺畅而补造公司时间线。

## 2026-07-14 Helio 调研补充

本轮对象：[[company.helio]]。产品判断：[[note.helio-product-takeaway-2026-07-14]]；过程记录：[[note.helio-research-run-2026-07-14]]。

对照 Kernel、Anyway、Sapiom 和 PayInsider 后，本轮只增加三项候选检查。

### AI employee 产品增加 trust contract audit

审批、审计和凭据隔离是产品控制面；Terms、Privacy、DPA、subprocessor、数据驻留、删除、训练用途和合规认证是合同控制面。两者要并排看。若 UI 的治理承诺领先于公开合同边界，应把它记录为企业采用风险，而不是被“有 approval”提前说服。

### Workspace architecture 与 distribution surface 分开

产品可以拥有自己的身份、任务和记忆模型，同时通过 Slack、Teams、Lark 或 Discord 获客与交付。研究时分别回答：状态保存在哪里、Agent 在组织中是什么身份、人从哪里使用它。不要仅凭“长得像 IM”或“接入 Slack”判断产品类别。

### Use-case breadth 与 verified product depth 分开

Automation 模板、SEO use-case 页面和角色目录说明团队想覆盖的市场；App、Docs、下载包、release、repo 与独立体验才说明当前实现深度。对页面里的每项能力至少标成 live、preview、coming soon、third-party verified 或 marketing-only，避免把模板数量当产品成熟度。

这些观察目前主要来自 Helio 及少量治理/企业 Agent 样本，继续在 Raft、Multica、Bloome、Lucius 等产品中复验后再决定是否升格为正式检查表。

## 2026-07-15 Multica 调研补充

本轮对象：[[company.multica]]。产品判断：[[note.multica-product-takeaway-2026-07-15]]；过程记录：[[note.multica-research-run-2026-07-15]]。

对照 Kernel、Raft、Helio、Superset 等既有轮次后，本轮只记录四项候选动作：

### Source-available 项目增加 license audit

“开源”必须回到 LICENSE 原文，核验托管/SaaS 限制、品牌条款、协议变更权与 SPDX。GitHub 可见、可自托管和 OSI open source 是三件不同的事。

### AI workforce 产品区分 activity 与 accepted output

并行 Agent、tasks、tokens、handoff 和 stars 都是活动指标。价值判断还需寻找 accepted deliverables、review queue、rework、human interventions、time-to-verification 与 cost per accepted output。

### 用 claim delta 对照营销与实现

把官网、docs、代码与真实体验并排看，记录工具数量、自动化程度、安全边界等口径差异。差异本身是证据，但不要未经判断就写成虚假宣传。

### 共域流量先写清访问对象

marketing、docs 与 app 共域时，参与度可能混合产品使用。既不能把全部访问当获客，也不能把高 pages/visit 直接当活跃客户。流量快照必须保存域范围和推断边界。

这四项目前仍是候选检查，等待更多 source-available、AI workforce 与共域产品样本复验。

## 2026-07-15 Paperclip 调研补充

本轮对象：[[company.paperclip]]。产品判断：[[note.paperclip-product-takeaway-2026-07-15]]；过程记录：[[note.paperclip-research-run-2026-07-15]]。

回看 Sapiom、Helio、Multica 与 Paperclip 后，“治理能力按控制环验证”已经在多类产品中重复出现，可作为稳定方法使用：

### 从治理 claim 追到完整控制环

对 budget、approval、audit、secret、sandbox、human-in-the-loop 等承诺，不只确认 UI/字段存在，而是逐项追问：

1. 信号由谁产生，是否完整、可信；
2. policy 在哪里判断；
3. enforcement 能否覆盖所有 adapter/runtime/外部动作；
4. 失败时是否有 retry cap、pause、rollback 与人工 gate；
5. 日志与证据是否足以复盘，但不会泄漏敏感信息；
6. 控制面是否衡量 accepted output，而不只是 activity。

Paperclip 的 subscription/Hermes 成本上报空缺说明：没有 telemetry，budget hard-stop 只是条件性能力；secret vault 也不能阻止模型把已解析秘密写进输出。功能存在与控制环闭合必须分别表述。

### 自托管开源产品增加隔离体验

在不放入真实凭据、不触发付费模型的前提下，完成安装、onboarding、对象创建与核心 UI 检查，可以验证产品是否为真实控制面，并暴露数据库、权限、adapter 与 workspace 边界。未执行真实任务时要明确写成 no-model smoke test，不能冒充生产体验。

### 传播规模与使用规模分开

开源首发的 X views、GitHub stars、官网 visits、YouTube relay 共同说明 distribution；客户、部署、活跃 workspace、留存、accepted deliverables 和收入才说明持续使用。流量出现 launch peak 后回落时，不把关注峰值写成业务线性增长。

## 2026-07-15 NewCore 调研补充

本轮对象：[[company.newcore]]。产品判断：[[note.newcore-product-takeaway-2026-07-15]]；过程记录：[[note.newcore-research-run-2026-07-15]]。

回看 Kernel 的 agent identity、Sapiom 的 access/payment governance、Paperclip 的 adapter control loop，以及本轮 NewCore、Arcade、Oasis、Astrix 的身份架构后，补充一项身份/授权产品专用检查。它不替代通用治理控制环。

### 把 Agent identity 拆成可执行的授权链

不要把“Agent 是一等身份”或“Agent 只是应用”直接当结论。依次核验：

1. principal：app、Agent instance、sub-agent 分别如何标识；
2. delegation：代表哪个用户或组织，委托来源能否追溯；
3. task/session：权限与当前任务、会话如何绑定；
4. scope：目标资源和动作能表达多细，是否受 destination API 限制；
5. token：谁铸造、有效期多长、是否会积累 standing access；
6. policy/enforcement：认证、token mint、tool call 是否都经过同一控制面，有无旁路；
7. revocation/evidence：能否实时撤销、保留 lineage 与审计，同时避免 secret 泄漏。

Identity inventory 证明“看得见”，不证明“拦得住”；JIT token 证明“凭据可短期化”，不证明“任务意图被正确翻译”；EMA/SSO 证明“入口可集中”，不证明“每次动作合理”。报告应分别表述。

这项检查已在多个治理样本中获得支持，但关于 agent-as-NHI 与 agent-as-app 的最佳边界仍未收敛，后续继续用真实客户部署复验。

## 2026-07-15 Ema 调研补充

本轮对象：[[company.ema]]。产品判断：[[note.ema-product-takeaway-2026-07-15]]；过程记录：[[note.ema-research-run-2026-07-15]]。

Ema 与此前早期、自助式或开源样本不同：它是已有多年交付历史、依赖实施与合作伙伴的大型企业平台。回看本轮证据后，增加以下成熟企业产品检查；目前只作为对应类型的检查项，不泛化到所有公司。

### 客户证据按证明力分层

把客户 logo、供应商 case study、客户本人公开陈述和可复核业务指标分开。供应商案例能证明系统和流程范围，不能单独证明归因；客户侧陈述能增强生产采用可信度，但没有口径、基线和时间窗时仍不能当精确 ROI。报告应同时写出“证明了什么”和“没有证明什么”。

### 连接器数量要追供应链和语义深度

连接器总数不是单一能力。区分自建连接器、统一 API 供应商、MCP server、浏览器兜底和客户定制工具；再检查每条路径的认证、权限 scope、数据同步、动作语义、失败处理和审计边界。供应商公告可以证明覆盖扩张，不等于每个系统都具备同等深度。

### API 与浏览器执行是两条不同可靠性轨道

API/MCP 路径通常更结构化、可授权和可审计；浏览器执行能覆盖没有 API 的遗留系统，但更依赖页面稳定、会话、视觉定位和异常恢复。产品同时具备两条轨道时，不把“能连接”直接写成“能稳定闭环”。

### 从 build demo 追到 day-2 生命周期

成熟企业客户的难点通常不止创建 workflow。继续核验测试、debug、版本、部署、监控、漂移、人工接管、权限变化、成本、维护和持续演进。厂商主动把重点从 build 转向 day-2，是产品阶段变化的信号；是否有效仍需客户证据和独立使用验证。

### 融资与产品口径要做跨轮次时间线

同一家公司的累计融资、扩展轮、战略入股、模型数、连接器数和团队规模会随时间变化。优先用各轮官方公告与强第三方报道逐项对齐，保留“当时口径”，不要把不同日期的数字拼成一个静态事实。

本轮还确认：大型企业平台的 GTM 更可能由创始人网络、战略投资人、实施伙伴和 lighthouse customer 共同推动；Product Hunt、Hacker News 或公司 X 的弱表现不能直接推出获客弱。但这只是 Ema 类型样本的观察，后续需用更多 enterprise agent 公司复验。
