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

回看 Moxt、当时因近名误入队列的 Floatbot 和 Raft 后，只增加四个当前可复用动作。这里保留真实研究历史，不把 Floatbot 倒写成尚未完成的 Floatboat：

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

## 2026-07-15 11x 调研补充

本轮对象：[[company.11x]]。产品判断：[[note.11x-product-takeaway-2026-07-15]]；过程记录：[[note.11x-research-run-2026-07-15]]。

回看 Lindy、Ema 与 Relevance AI 后，本轮增加四个候选动作：

- **官网自洽性审计**：跨 pricing card、FAQ、meta、case top card 与正文核数字；冲突本身是证据，不能挑最好看的一个。11x 暴露了三套起价、0%/61% 转化、5x/3x 会议和模板残留。
- **客户证明阶梯**：供应商实名案例、客户侧复盘、独立采购数据、媒体调查分别回答不同问题。Ramp 证明采用，不证明 ROI；11x 案例证明合作，不证明独立成效。
- **数字员工服务含量审计**：固定查 onboarding、weekly check-in、CSM、FDE、人工修正和 handoff。高服务含量不等于产品失败，但会改变自治程度、毛利与可复制性判断。
- **争议后的修复链**：有历史负面调查时，继续查 CEO/CTO、产品重建、收购、当前客户与当前 cohort，不把“曾经出错”或“已经修好”任何一边写成未经验证的终局。

Lindy 与 11x 共同支持“角色化前台 + 更复杂执行底座”，但二者默认用户、价格和交付方式差异很大。以上动作暂不升级为所有公司统一模板；后续第三个垂直数字员工样本再验证。

Bloome 还再次验证了主体边界：共享 founder、员工和开发者账号只说明组织连续性，不能自动迁移另一个产品的融资、团队规模或经营数据。

## 2026-07-15 TeamDay 调研补充

本轮对象：[[company.teamday]]，相关历史产品：[[company.ayanza]]。产品判断：[[note.teamday-product-takeaway-2026-07-15]]；过程记录：[[note.teamday-research-run-2026-07-15]]。

回看 Lindy、Marblism、Motion/Wonderly 等产品谱系样本，本轮增加四个候选动作：

- **商业 launch 与产品出生双时间线**：waitlist、首次公开工件、产品重包装、付费 self-serve 分别记节点。TeamDay 的 2026-07-13 是商业入口，不是产品首次存在。
- **产品谱系三证合一**：创始人明确表述、法律/运营主体、产品工件连续性一起读。共享团队不等于 rename/acquisition，旧公司的融资和规模不自动迁移。
- **流量意图审计**：除了 visits 和 channel share，固定检查 brand/non-brand、具体关键词和 similar-site 语义。SEO 访问可能来自模型词、竞品词或完全无关内容。
- **公开口径漂移审计**：pricing、terms、data policy、security 与 marketing blog 按发布日期并排读。planned/ready/certified、credits/runs 等冲突本身要保留。

TeamDay 同时出现“多阶段商业化、独立产品谱系、SEO 意图污染、政策版本漂移”四类问题，适合把这些动作放入后续同类调研的观察清单；仍不足以升级为所有公司统一模板。

## 2026-07-15 Polsia 调研补充

本轮对象：[[company.polsia]]。产品判断：[[note.polsia-product-takeaway-2026-07-15]]；过程记录：[[note.polsia-research-run-2026-07-15]]。

回看 TeamDay、11x、Lindy 与 Raft 后，本轮只为“高自治 + 公开经营指标 + 外部副作用”产品增加五个候选动作：

- **公开经营指标复算**：不要只抄 headline ARR/MRR。找公式与组成，分 subscription、usage、pass-through、one-off、ad spend、GMV，并保留计算日期和字段定义缺口。
- **公司生成漏斗分层**：created、launched、active、paying、successful 分开；生成公司数不能代替经营公司数，任务数不能代替 accepted outcome。
- **零员工人力边界审计**：正式 employee、fractional/contractor、合作方工程师、供应商服务、人类支持升级和最终信任节点分别记录，避免把 headcount 叙事写成劳动消失。
- **自治副作用 operating contract**：对广告、邮件、支付、退款、域名、公开 dashboard 等动作，固定读 Terms/Privacy/Subprocessors，明确谁授权、谁付费、谁担责、谁是 merchant of record、能否撤销。
- **历史批评 current recheck**：争议审计提供调查方向，不自动成为当前事实；逐项重测 API、权限和页面状态，修复过的历史问题与仍存在的配置分开写。

Polsia 还形成候选 GTM 模式 [[concept.live-operating-dashboard-as-gtm]]：公开看板能同时成为产品演示、社会证明、融资数据室和内容引擎。是否适用于非高透明产品，仍需第二个样本验证。

## 2026-07-15 NanoCorp 调研补充

本轮对象：[[company.nanocorp]]。产品判断：[[note.nanocorp-product-takeaway-2026-07-15]]；过程记录：[[note.nanocorp-research-run-2026-07-15]]。

回看 Polsia、TeamDay、Lindy 与 11x 后，本轮对“自治公司工厂”增加六个候选动作：

- **平台收入 / 用户结果双账**：vendor subscription ARR、用户公司 GMV/revenue、平台抽成与广告经手金额分开，不能用平台卖得好证明客户经营成功。
- **公开指标分母审计**：headline company/site/task/email 之外固定找 earning、paying、retained denominator；created → live → active → paying → earning → retained 分层。
- **补贴 cohort 审计**：Ambassador credits、比赛奖金、referral credits、co-marketing 与自然用户分开；公开 success story 要标注是否被资源补贴。
- **Pivot 资本连续性**：法律主体连续时可以保留历史投资边，但必须标 `legacy-product`、原产品与日期；旧融资不改写成新产品融资。
- **公开 API 最小化**：公开 endpoint 不等于适合复制。只保存研究所需 aggregate，不沉淀邮件正文、任务内容、个人数据和可滥用操作细节。
- **Vendor comparison 时效审计**：竞品比较页首先是 positioning/SEO 证据；每个竞品事实回到对方当前官网、docs、terms 与流量源重验。

NanoCorp 是 [[concept.live-operating-dashboard-as-gtm]] 的第二个高密度样本：看板能证明 operating activity，也会带来隐私、口径与成功率误读。它还新增 [[concept.production-trace-agent-harness-loop]]：生产失败轨迹可以持续转成 skills、工具 contract 和恢复策略。两个模式仍需在非自治公司产品中继续验证适用边界。

本轮也修正运行入口经验：`/tmp` 适合短期下载和截图，不适合作为唯一 CLI 入口；Memex 日常入口由工作区环境提供持久的 `mmx` 命令，并在自动化中通过 `MMX` 环境变量引用。平台 CLI/浏览器离线属于工具域问题，通知 owner 后继续不依赖该能力的研究，不用 ad hoc 绕过制造第二套流程。

## 2026-07-15 Cofounder 调研补充

本轮对象：[[company.cofounder]]。产品判断：[[note.cofounder-product-takeaway-2026-07-15]]；过程记录：[[note.cofounder-research-run-2026-07-15]]。

回看 Polsia、NanoCorp、Paperclip 与 Lindy 后，本轮为“公司工厂 + Agent 控制面”增加四个候选动作：

- **版本重构断点**：sunset、rewrite、relaunch 前后的用户、产品定义、流量与 adoption counter 分开保存；新版本发布峰值不能回填成旧产品的连续增长。
- **Marketing promise / operating contract 双读**：官网的 approval、安全与自治叙事必须和 Terms、权限、merchant responsibility、退款/chargeback、audit 与 rollback 并排；“有人类审批”不等于每个动作逐次审批。
- **战略/补贴案例降偏**：案例对象是否同时是投资人、fellow、ambassador、grant/credits recipient 或 co-marketing partner；证明产品可用与证明自然购买/留存是两件事。
- **公开 counter 定义漂移**：同站不同页面的 company、agent、task 等实时计数保留页面与采集日期；没有 active/paid/retained 定义时，不用最新最大值覆盖旧口径。

Cofounder 还验证了 relaunch sequence 的传播质量：106 秒视频、一句强品类叙事和创始人网络制造了 5 月访问峰值，而 HN/PH 并非主要放大器。流量峰值只能证明 attention；必须继续看后续回落、brand/non-brand、app outgoing 与留存分母。

## 2026-07-17 Ponder 调研补充

本轮对象：[[company.ponder]]。产品判断：[[note.ponder-takeaway-2026-07-17]]；过程记录：[[note.ponder-research-run-2026-07-17]]。

回看 TeamDay/Ayanza、Motion/Wonderly、ResearchFlow/Ponder 三组产品谱系后，本轮增加五个候选动作：

- **品牌 launch / 产品起点双时间轴**：正式品牌发布、旧 handle、beta、论文产品名与法律主体分别记录，避免把 rebrand 当首次 launch。
- **公司参与研究的双重使用**：用户研究可提供比 testimonial 更强的产品证据，但固定记录样本、任务、模型差异、无效结果和 conflict of interest，不把论文标题当独立 endorsement。
- **首页 / 比较页定位冲突审计**：首页回答想要的 TAM，竞品比较页常暴露真实 wedge；两者冲突是产品战略信号，不急着替公司统一口径。
- **Sitemap 结构化 GTM 审计**：按语言、blog、feature、comparison/use-case 计数，同时抽查模板质量、日期、标题映射和 non-brand traffic；页面数量不等于搜索护城河。
- **视觉知识产品的准确性反证**：体验、认知负担、任务完成速度与判断准确率分开；画布更清晰不能直接写成理解更深。

Ponder 还形成候选产品模式 [[concept.reasoning-graph-as-workspace]]。它是否能成为长期知识资产，后续需要用其他 reasoning canvas 样本验证引用、关系类型、冲突处理和大图维护成本。

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

## 2026-07-15 Sintra 调研补充

本轮对象：[[company.sintra]]。产品判断：[[note.sintra-product-takeaway-2026-07-15]]；过程记录：[[note.sintra-research-run-2026-07-15]]。

回看 Lindy、11x、Floatbot、Ema 等 AI employee 样本后，本轮增加四项检查。前两项适合 creator/affiliate 驱动的消费 SaaS，后两项适合 credits 产品和 SMB AI suite，暂不泛化到所有企业产品。

### Review 必须做 provenance audit

遇到 YouTube review、X 长帖、Reddit 高分长评或媒体榜单，先核查 sponsored disclosure、affiliate link、coupon、跳转域名、发帖社区性质和作者商业关系，再判断它属于独立评价、客户证据还是分发素材。高播放、高互动和长篇幅都不能自动升级证据等级。Sintra 的多个“review”实际组成了 paid creator 与 affiliate 获客网络。

### 把 credits 换算成任务容量

不要只抄“每月多少 credits”。从官方文档取得聊天、检索、定时任务和复杂多工具任务的消耗区间，再换算套餐大致能承载多少真实任务；同时检查失败重试、跨 workspace 共享、余额耗尽后的行为、top-up 续费与退款。换算只是容量边界，不代表用户真实频次或单位经济。

### 应用商店同时提供采用、版本和视觉证据

当官网被挑战页拦截或营销文案过强时，Apple/Google 商店可交叉验证首次上架、最近更新、评分量、下载区间、移动端价格、开发者主体、公开截图和版本说明。商店描述中的客户数仍是厂商自报；两个平台的文案冲突应保留，不能自行选一个更好看的数字。

### Similar sites 必须逐个做语义复核

算法相似网站只提供候选，不直接等于竞品。对候选逐个核验目标客户、核心任务、产品层级和购买者，再标为 direct、adjacent 或 noise。Sintra 的 Marblism 是直接 SMB AI employee suite；Synta、Vizzy Labs 等更多是关键词、受众或分发邻接。流量工具负责扩种子，研究者负责分类。

## 2026-07-15 Marblism 调研补充

本轮对象：[[company.marblism]]。产品判断：[[note.marblism-product-takeaway-2026-07-15]]；过程记录：[[note.marblism-research-run-2026-07-15]]。

对照 Sintra、Lindy 与 11x 后，本轮增加四项适用于产品转型、角色化 SMB SaaS 和 affiliate 密集产品的检查。

### 当前产品要追 product genealogy

公司可以保留名称、团队、资本和用户需求，却完全更换交付物。继续查旧官网、旧 launch、founder 复盘与社区 failure mode，回答“旧产品为什么失败、哪些资产被新产品继承”。Marblism 的旧 app builder 已有用户和 ARR，但最后的调试、安全与维护仍要求懂代码；新 AI employees 正是对这个 friction 的重写。

### 对照营销单位与计费单位

“员工”“无限任务”“无限 leads”是购买语言，不一定是 billing unit。继续追 credits、hours、actions、tokens、success fee 或 seat，换算额度耗尽、失败重试、返工和 rollover。Marblism 卖六名员工，实际按厂商估算的人类工作小时计量。

### 创始人变化优先查法定文件

YC、LinkedIn 和媒体适合发现人物；Companies House、州公司注册、董事/PSC filing 等适合确认退出与控制权时间。历史联合创始人关系应保留，但必须和当前管理层分开。

### Partner 声量按 distribution evidence 处理

当官方提供高比例长期佣金时，Reddit、X、YouTube 和博客里的正面内容默认先做 affiliate provenance audit。重复文案、折扣码、referral URL 和 disclosure 证明获客网络存在，但不能直接证明满意度。只有独立客户侧、长期使用和可核验结果才能升级为产品采用证据。

## 2026-07-15 Motion / Wonderly 调研补充

本轮对象：[[company.motion]] 与 [[company.wonderly]]。产品判断：[[note.motion-product-takeaway-2026-07-15]]、[[note.wonderly-product-takeaway-2026-07-15]]；过程记录：[[note.motion-wonderly-research-run-2026-07-15]]。

对照 Marblism 的产品换轨、Sintra 的 credits、Ema 的企业交付与本轮双品牌后，增加两项适用于产品谱系和结果型 Agent 的检查。

### 品牌关系用五类证据交叉核验

当旧官网、新域名、招聘页和员工简介互相称为 rebrand、spin-off 或新产品时，不直接选择一个标签。分别核验：

1. 法律主体与 Terms/Privacy provider；
2. 创始人、员工和招聘职位是否共享；
3. 旧品牌与新品牌是否同时有活跃产品、定价和流量；
4. 社区迁移、功能弃用和客户沟通；
5. 融资是否投向同一法人，是否存在独立轮次。

只有官方交易或公司文件支持时才写 acquisition；只有旧产品明确停止且新品牌承接时才写完整 rebrand。否则优先建独立主体，以产品谱系和共享团队连接。

### 结果型 Agent 增加商业控制环

对 revenue share、pay-on-result、lead guarantee 或 outcome pricing，不只问模型是否完成任务，还要追：

1. outcome 的定义、基线和时间窗；
2. attribution 由谁记录和审计；
3. lead/customer ownership 与独占性；
4. 退款、失败、取消与 tail period；
5. 广告、电话、短信、邮件和支付的合规责任；
6. 软件、第三方服务和人工实施各自承担什么；
7. 收入提升是否有独立客户侧证据。

Wonderly 说明结果定价会把治理从技术 runtime 扩展到合同、归因与渠道冲突。它不能被简化为“更接近价值的 pricing”。

## 2026-07-15 Pancake 调研补充

本轮对象：[[company.pancake]] 与其运营主体 [[company.basalt]]。产品判断：[[note.pancake-product-takeaway-2026-07-15]]；过程记录：[[note.pancake-research-run-2026-07-15]]。

对照 Motion/Wonderly、Marblism 和 Cofounder 后，本轮把产品谱系研究补成四个动作：

1. **先查 legal operator**：Terms、Privacy、账单主体和 OAuth app developer 往往比媒体更能回答新品牌属于谁；融资边默认挂法人/公司，不直接迁移到新产品。
2. **把品牌变化拆成四种状态**：新产品线、pivot、rebrand、独立 spinout。只有官方明确停止旧产品并承接主体时才写完整 rebrand；否则保留两个主体与共享 founders。
3. **“我们用自己的产品运营”要做 headcount/time audit**：区分从首行代码到收入、当前日常运营和当前团队规模，避免把历史 zero-hire 叙事写成当前零员工。
4. **内容集群既是 GTM receipt 也是质量风险**：统计集中发布日期、Invalid Date、竞品页覆盖和 brand/non-brand search；文章数量不等于排名、流量或可信度。

Pancake 还补出 autonomy percentage 的强制边界：记录厂商数字时必须同时问分母是任务、工时、动作还是职能，哪些动作需要逐次批准，哪些已有 standing authorization，以及失败如何升级、审计和回滚。没有这些定义时，50%、80% 或 99% 只表示产品叙事，不能作为跨公司 benchmark。[[concept.progressive-company-autonomy]]

## 2026-07-15 Kylon 调研补充

本轮对象：[[company.kylon]] 与共享创始人的历史产品 [[company.kepler-ai]]。产品判断：[[note.kylon-product-takeaway-2026-07-15]]；过程记录：[[note.kylon-research-run-2026-07-15]]。

对照 Pancake 的经营/分发证据、Motion/Wonderly 的产品谱系、Paperclip 的 runtime 治理和 NewCore 的身份控制，本轮补充三项通用核对。

### 实现深度与采用规模分两条证据链

Docs、API contract、package、release note、App Store 版本和本地 smoke test回答“产品是否真的 ship、能力边界是什么”；客户侧案例、活跃 workspace、付费、留存、独立社区、流量和任务量回答“是否被持续采用”。两条链必须分别总结，不能用 npm 下载、GitHub commit 或文档完整度代替客户规模，也不能因为流量弱就否定真实实现。

package 下载还要先核对创建日期、stable/prerelease 密度、CI、重复安装和 bot。只有去重口径明确时才接近用户量。

### 产品谱系拆成人、品牌、法人、融资四层

共享创始人和相似产品思想只能证明团队/知识迁移。继续分别查：

1. 人物当前履历与官方 founder attribution；
2. 旧品牌是否仍活跃、域名是否被复用；
3. Terms / Privacy 的法律 operator；
4. 每条融资证据明确指向哪个公司或产品。

没有正式说明时，不建立 rename、acquisition、legal-successor 或融资继承。Kylon 与 Kepler AI 只表达共享创始人与思想谱系；PearX/Atria 留在 Kepler，Leonis 留在 Kylon。

### 用竞品比较页反推 architecture contract

厂商比较页经常比首页更清楚地暴露它真正重视的约束，例如 attention、delegated permissions、native database、multi-model、trigger 和 per-user rendering。先把这些维度提取为产品 contract，再用 Docs、Terms、入口体验和客户证据交叉验证。比较页仍是自利材料，不能直接作为胜负结论。

Kylon 还补出 [[concept.agent-output-attention-compression]]：当 Agent 输出增长后，必须检查产品如何压缩过程、突出异常和待审批动作，而不是只统计并发 Agent 或 token 产出。

## 2026-07-16 Floatboat 实体纠错补充

本轮对象：[[company.floatboat]]；对照误入队列的近名主体 [[company.floatbot]]。产品判断：[[note.floatboat-product-takeaway-2026-07-16]]；过程记录：[[note.floatboat-research-run-2026-07-16]]。

这轮只增加一条基础门禁：**近名主体在扩图前完成四点消歧**。

1. 精确域名是否相同，旧域名是否跳转；
2. 创始人/核心团队是否相同；
3. 产品截图、目标用户和主工作流是否相同；
4. Terms/Privacy、签名证书或公司注册中的 operator 是否连续。

名称只差一个字符、媒体互相误写、搜索结果混在一起，都不能代替这四点。四点中出现明显冲突时，先建独立主体或 candidate，不做批量替换；原 dossier 若事实成立则保留，只修正错误的赛道关系和 backlinks。

Floatboat 还补充了产品迁移的观察方式：把首发实测、创始人访谈、当前官网、版本化客户端和流量节点放在同一时间轴上。这样才能识别“上下文工作台 -> 日历运行时”是产品中心迁移，而不是把当前文案倒写成自成立以来不变的定位。

## 2026-07-18 Evose 调研补充

本轮对象：[[company.evose]]。产品判断：[[note.evose-takeaway-2026-07-18]]；过程记录：[[note.evose-research-run-2026-07-18]]。

回看 Ema、Relevance AI、NewCore、TeamDay 等企业 Agent / control-plane 样本后，本轮增加一项适用于企业控制面产品的 claims audit。它不替代真实账号体验和客户证据，也不要求早期消费产品承担同样的采购材料。

### 把 enterprise claim 拆成五列

对认证、API/SDK、多渠道、私有化、SLA、活跃规模和客户案例，分别记录：

1. 营销页怎么说；
2. 产品文档标为 supported、planned 还是 roadmap；
3. 公开入口在当前环境能否复现；
4. 是否有客户侧或独立第三方证据；
5. Terms、Privacy、Trust Center、DPA 和签约主体是否支持采购。

只有多列一致时才升级为“已交付”“已采用”或“已认证”。官网的勾选、完整示例代码和产品截图只能证明厂商主张；公开 smoke 失败也可能来自权限、地区或环境，应写成“本轮不可复现”，不能直接外推为全产品不可用。

### 对 developer surface 做最小可复现检查

当产品把 API、Web SDK、移动 SDK、企业 IM 和 MCP 写成核心能力时，至少核对公开 endpoint、OpenAPI/SDK 状态、示例 CDN、下载入口、登录边界和文档状态。特别注意官网 COMING、文档 supported、SDK roadmap 和实际 HTTP 状态之间的冲突。

### 把采购成熟度视为产品的一部分

面向金融、医疗、政府和大型企业时，法定 operator、注册地址、司法辖区、责任限制、数据驻留、subprocessor、认证报告和安全联系人不是附录。它们决定产品能否进入采购和生产。缺失时应和功能成熟度分开评分，不能因为界面完整就默认 enterprise-ready。

Evose 还再次验证：演示面板数字、官网 traction claim、创始人未具名客户与真实 activated / paid / retained 指标必须分开。后续同类研究优先追组织数、生产工作流、活跃席位、续费与 expansion，而不是 follower 或注册口径。

## 2026-07-19 Sunrise International 调研补充

本轮对象：[[company.sunrise-international]]。商业判断：[[note.sunrise-international-takeaway-2026-07-19]]；过程记录：[[note.sunrise-international-research-run-2026-07-19]]。

回看近期 Evose 的 enterprise claims audit、Pancake 的 legal operator、Kylon 的实现/采用双链和 Floatboat 的近名消歧后，本轮把对象切换为跨境营销与咨询服务公司。只增加两项服务业检查，不把单个样本泛化为统一模板。

### 服务公司建立交付证据阶梯

对咨询、营销、实施与活动机构，按以下层级分别记录：

1. 官网服务声明；
2. 具名客户或项目；
3. 有时间窗和口径的供应商案例；
4. 客户侧确认、公共合同或付款记录；
5. 续约、扩单、长期留存与可复核业务结果。

供应商案例可以证明交付范围，不能单独证明归因和 ROI；logo 墙还要区分客户、合作伙伴、媒体、活动参与者与协会。公共采购能确认真实交易，但单笔金额不能外推平均客单、收入或利润。

### 先找行业入口，再评渠道技巧

研究服务公司时，新增一个问题：它长期进入或运营哪些行业入口？学校网络、协会、会议、展会、研究合作和专业媒体，可能同时承担获客、信任、客户洞察和交付场景。Sunrise 生产 AWE Asia，并长期进入国际教育协会与学校网络，因而活动不只是单项服务，也可能是 [[concept.industry-network-as-agency-distribution|行业网络作为营销公司的分发基础设施]]。

该判断仍需后续样本验证。没有 lead、conversion、renewal 和 revenue attribution 时，只写网络结构与可能机制，不把所有参会者视为客户，也不宣称活动已经形成可量化增长飞轮。

### 网站流量对关系型 B2B 只作局部信号

营销公司的官网访问量只能回答数字发现渠道强弱，不能直接回答项目规模。行业活动、转介绍、长期客户和线下商务可能贡献主要线索。流量缺失时不制造数字；取得数据后也要和合同、案例、团队、客户侧确认和内容更新共同判断。
