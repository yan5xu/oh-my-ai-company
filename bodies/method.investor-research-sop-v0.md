# 投资机构调研 SOP v0

> **状态：active v0。** 本方法由 [[investor.first-round-capital]]、[[investor.andreessen-horowitz]]、[[investor.conviction]] 分别校准精品早期、多基金平台型、小型 AI-native 三类机构，并吸收 Accel、Lightspeed 的历史经验。它是当前批量摸排的操作基线，不是永不变化的最终标准；每轮仍记录流程与反例，再决定是否修订。

## 目标

把投资机构从 company dossier 里的一个名字，转化为可查询、可扩张、可监控的研究网络：

- 机构是谁、用什么资本工具、在哪个阶段下注；
- 谁做判断、不同 partner 形成什么能力圈；
- 已投公司如何连接成产品层与市场 thesis；
- 投资后提供什么、公开证据能证明到什么程度；
- 内容、社群、媒体和项目如何带来关系与案源；
- 中文世界如何理解它，和英文一手叙事有何偏差；
- 哪些账号和页面应持续监控。

最终产物不是机构介绍，而是 **Investor -> Person -> Investment -> Company -> Concept -> Source/Touchpoint** 的证据网络。

## 0. 先做基线盘点

在外部搜索前先查 vault：

- 机构已有多少 `investment` 和相连 company；
- 是否已有 body、source、person、note、concept、touchpoint；
- 哪些关系只有 Markdown mention，哪些是 field 强关系；
- 是否已有同名、旧名、地域分支或品牌混淆。

优先选择“在目标公司中反复出现、但机构资产仍薄”的对象。不要因为机构知名就优先，也不要重做已经很完整的 dossier。

## 1. 建立 source map，而不是直接写结论

先收集持续入口，再收集一次性证据。

### 持续入口 `touchpoint`

- 官网与投资策略页；
- portfolio / companies；
- current team；
- news / blog / research / podcast；
- X、LinkedIn、YouTube；
- founder、fellow、angel、accelerator 等项目页。

### 单次证据 `source.item`

- 基金公告或监管 filing；
- 单笔投资公告；
- 合伙人 profile / thesis；
- 访谈、播客、演讲；
- 中文媒体、社区帖子、搜索快照。

动态页返回 cookie/nav/空壳或实质内容少于 200 字时，标记抓取失败或 empty shell，不据此写结论。

## 2. 确认机构身份与资本架构

至少回答：

1. 法律/品牌名称、旧名、中文译名和易混对象；
2. 成立时间、主要办公室和投资地域；
3. fund / opportunity / growth / sector vehicle 如何分层；
4. 目标阶段、初始 check、lead 倾向、ownership、reserve；
5. LP 来源、募资状态与部署节奏能确认到哪里。

证据优先级：监管 filing / 官方公告 > 强媒体 > 数据库聚合 > 社区。Form D 的 offering amount、amount sold、filing date 必须分别写，不能把 offering target 写成 final close。

监管链要拆成三步：名称/品牌只用于 entity discovery，CIK 与 accession 用于 filing history，原始 XML/PDF 才用于字段解析。名称搜索 no-hit 不等于 vehicle 不存在；已知 CIK 时优先直接读 filings。Form ADV 的 private fund GAV、Form D 的 offering/sold、机构公告的 subscribed/closed 是不同口径，必须并排保留，不能用其中一个覆盖另一个。

### 多阶段机构先画品牌下的资金地图

大型机构不能只建一个 investor 再挂全部 company。先区分：

- brand 与 SEC registered adviser；
- Seed / Venture / Growth / sector fund；
- accelerator、scout、fellowship、opportunity vehicle；
- evergreen / long-duration / family capital 等非典型平台；
- 当前策略与历史 fund 的继承关系。

基金公告里的总募资是多 vehicle 之和时，不得写成单一主题基金。AUM、RAUM、committed capital、fund size 与可部署 dry powder 必须保留各自口径。

### 主题、团队、基金不是同一层

官网单列 AI、security、fintech 等 topic，不代表存在同名 fund 或 team。至少用三个证据面交叉：fund announcement、team directory 的实际 vertical、具体 investment byline/vehicle。主题页只证明内容与市场入口，除非有额外证据，不升级为组织结构。

### 小型机构也要检查 sidecar / opportunity vehicle

团队小不代表资本结构简单。个人品牌或 AI-native 机构仍可能同时存在 flagship、expansion/opportunity、select/SPV、accelerator SAFE。监管 filing 中的 offering amount、amount sold、first sale、related persons 分别记录；新 vehicle 的设立不等于已完成募资，也不自动说明它投资了哪些公司。

## 3. 把 current team 与历史归因分开

建立人物层时至少分：

- 当前 Partner / GP；
- Investor / Principal / VP；
- Operating Partner / platform team；
- Board Partner / Venture Partner / Special Partner；
- 已离职但仍出现在历史 portfolio 的投资人。

人物对象至少保留 role、机构 affiliation、官方 bio、X、LinkedIn。不要因为 portfolio 仍显示某人，就把他写成当前合伙人。

对于上百人团队，默认只建三类人物：机构创始/治理者、能解释当前 portfolio 交集的公开责任人、能够代表关键 thesis/平台能力的负责人。其余人员保留在结构化 source 或统计摘要中，避免图谱被组织目录淹没。

对于 10 人以内的小机构，可扫描完整团队，但默认只把投资侧、关键 platform owner 和可解释关系的人建为 person；EA/Ops 与一般支持角色先留在团队 source。个人品牌需要同时作为 sourcing/distribution 资产与 key-person risk 研究。

## 4. 研究决策系统

不要止于“喜欢什么创始人”。要找：

- sourcing 由个人还是团队驱动；
- first meeting、partner meeting 和 IC 如何组织；
- 决策权、投票、否决或 sponsor 机制；
- 是否有 memo、rubric、reference、data 或反偏差流程；
- 是否做 post-decision / post-mortem；
- 冲突、竞争投资和信息墙如何处理。

若只看到原则口号，就明确写“机制不可见”。

投资公告作者、partner attribution、董事会席位和最终决策权是四种不同关系。Byline 可以支持公开归因和能力圈，不能自动支持 sponsor、IC vote、否决权或单人决策。旧文章披露的机制必须标注年代；机构重组后不可直接沿用。

## 5. 结构化 portfolio，再形成 partner clusters

### 第一步：抽取官方字段

优先保留：company、initial stage、partner、founder、category、location、status、official URL。动态页面有结构化 payload 时用结构化数据，不逐卡手抄。

### 第二步：只建立可证明的强关系

- `investment` 必须有 investor、company、round、role、confidence 和 evidence；
- round total 不拆到单家；
- portfolio page 能确认“初次合作 Seed”，但不能自动补日期、金额或 lead；
- 对当前 vault 中已研究公司优先建边，不一次搬完全部 portfolio。

### 第三步：按 partner 看能力圈

统计每位 partner 的代表项目和重复产品层，结合其 operator background 判断 cluster。Partner attribution 不是单人决策证明，也不等于机构统一 thesis。

### 第四步：选扩张对象

优先深挖：

- 揭示新基础设施层或二阶需求；
- 与当前核心赛道形成直接竞争/相邻关系；
- 被同一 partner 连续下注，能验证其 thesis；
- 已有强证据且能进入监控闭环。

大型 portfolio 默认只扩当前 vault 已研究公司的交集，以及少量能验证新产品层的候选。不为了“完整”导入数百家公司；官方列表也可能排除未获披露许可、未宣布资产并存在更新滞后。

## 6. 研究机构 operating system

投资后支持至少拆成：

- partner working model / board；
- recruiting / talent；
- product / PMF；
- GTM / pricing / sales；
- brand / content / launch；
- follow-on fundraising；
- executive / decision / peer community。

对每项分别判断：

1. 只是服务目录；
2. 有公开流程、团队和产物；
3. 有被投公司 testimonial；
4. 有独立结果或 cohort 数据。

不要从“服务完整”直接推出“服务有效”。

对平台型机构，额外拆出 customer/government briefing、media/distribution、global partnerships、accelerator 和 open-source/research。注意这些服务往往是选择性投入；历史 pipeline 不是收入，launch exposure 不是 adoption，团队规模也不是覆盖率。

对小型 AI-native 机构，重点检查 cohort、compute/API credits、人才活动、播客、fellowship 和公开 opportunity map。名义 credits 不等于实际使用，活动名单不等于 portfolio，投资方 launch 文中的客户结果仍需客户侧或独立来源交叉。

## 7. 把内容与社群当作网络研究

检查机构是否拥有：publication、podcast、newsletter、angel/fellow/scout program、founder program、events、talent network。

关键不是数量，而是是否存在事实连接：

- 参与者是否共同投资；
- alumni 是否推荐 founder；
- 内容作者是否成为 partner、advisor、founder 或客户；
- portfolio 经验是否回流成公开 playbook；
- 项目是否在融资前接触潜在公司。

有连接时可形成 [[concept.content-community-dealflow-loop]]；只有粉丝数或活动数时保持为传播信号。

## 8. 做中文认知审计

延续 [[method.investor-chinese-perception-audit]]：

- 先查英文名、旧名、中文译名和错译；
- 微信、知乎、小红书、即刻、中文媒体分别看；
- 区分机构史、投资新闻、方法论转载与职业品牌；
- 二手数字和观点反向追到一手；
- 搜索 count 不作声量份额。

输出要回答：中文世界记住了什么、遗漏了什么、哪里产生叙事失真。

## 9. 写入 Memex

最低对象集：

- `investor`：机构主体与中文 dossier；
- `person`：关键当前人物；
- `investment`：已验证强边；
- `source.item`：每项事实的证据；
- `touchpoint`：持续监控入口；
- `note`：事实之外的研究判断与过程反思；
- `concept`：跨机构可复用的 thesis / operating pattern；
- `method`：本轮方法变化。

机构正文使用中文，必要处保留英文原词；正文双链用于阅读，关键关系必须进字段。图片同时包含真实官网/内容素材和必要截图，不只存 logo。

## 10. 停止条件

单家机构达到以下条件即可结束一轮：

1. 身份、stage、geography、fund vehicle 边界已写清；
2. 当前关键团队与历史人物已区分；
3. 至少一个 partner cluster 有事实依据；
4. 已验证的目标公司投资边已建；
5. decision / operating system 能确认的部分与 no-hit 均已记录；
6. 内容、社群与中文认知至少完成一轮采样；
7. touchpoint、source、note、assets、issues 和 Graph 均验收；
8. 下一步只剩边际扩张，而非关键结构缺口。

时间或注意力有限时，最小闭环保留：**机构身份 + 当前团队 + 官方 portfolio + 与现有公司强边 + 一个判断 note + 监控入口 + 证据边界**。可舍弃长尾人物、全量 portfolio、弱社区样本和装饰性图片。

## 11. 每轮验收

- 正文事实均可回到 source；
- offering/round total 没被拆错；
- current / historical team 不混；
- partner cluster 标明是 attribution/inference；
- S4、empty shell、搜索快照未升级为事实；
- body 图片均存在且被引用；
- `body refresh` 后强弱关系符合预期；
- `issues=0`；
- Graph 能从 investor 看到 person、investment、company、source、note、concept、touchpoint；
- 单独记录本轮流程、失败和方法变化。

## 12. 全面摸排时使用三级深度

单机构试点不能直接复制到全部 investor。先根据不同已研究 company 的去重交集、战略相关性、现有资产债务和机构类型分层：

- **核心机构：** 通常连接 5 家以上公司，或对目标赛道具有高战略价值。运行本 SOP 全部步骤，形成完整 dossier 与人物/机构网络。
- **重复机构：** 连接 2–4 家公司或在同一赛道重复出现。先做标准档案：身份、关键人物、已验证投资边、portfolio cluster、官方 thesis、判断 note 与监控入口。
- **单次机构/个人：** 只出现一次时先做证据卡：主体消歧、官方 URL、investment 和 source。出现第二家公司、明确 thesis 或关键网络关系时再升级。

不要把正文长度、社交关注或机构名气直接当优先级。完整批次设计与当前基线见 [[note.investor-sweep-baseline-2026-07-21]]。

## 后续继续校准的问题

- 非美国机构、corporate VC、accelerator、family office 是否需要不同章节；
- 多阶段机构是否需要在 Memex 新增独立 `fund` / `program` type；当前先在正文和 source 中保留 vehicle 语义，避免过早扩 schema；
- 人物 cluster 应按项目数、当前活跃度还是 thesis article 加权；
- operating support 的效果应如何建立可比指标。

First Round、a16z 与 Conviction 已覆盖当前批量摸排所需的三种主要机构形态。SOP 进入 active v0；遇到非美国机构、corporate VC、accelerator、family office 时，先记录差异，不强行套用，再决定是否形成分支方法。
