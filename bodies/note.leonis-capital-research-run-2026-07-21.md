# Leonis Capital 投资机构调研轮次复盘

## 这一轮从哪里开始

[[investor.leonis-capital]] 已经通过 Viktor、Motion、Kylon 等 8 家公司反复进入图谱，但机构正文只有约 1,300 字、没有人物强关系，只有 3 条 `about_investor` source。它是合适的小型 AI-native fund 样本：比 [[investor.conviction]] 更强调公开技术研究和 pre-company sourcing，又没有大型基金的多阶段组织复杂度。

最初问题不是“Leonis 投了谁”，而是：它为什么能较早发现 Viktor 这类技术团队，这种能力来自个人经验、公开研究，还是已经形成机构系统。

## 实际跑过的路径

1. 先盘点已有 8 条 investment、3 条 source 和 Markdown mentions，确认缺口集中在 team、fund vehicle、decision system、operating support、中文认知。
2. 读取官网首页、team、research、portfolio、Alpha Program，分别建立持续 `touchpoint`，没有把一次性页面和监控入口混在一起。
3. 从 SEC Form D 找到 Fund II vehicle，再用原始 XML确认 filing-time offering amount、amount sold、first sale 和 related persons。
4. 从 Form ADV 补当前 adviser 与 private fund 结构，明确 GAV 不能和 2,500 万美元 subscribed capital 直接比较。
5. 用 2025 公司 Fund II 新闻稿补募资后续与 Alfa 系统；把 Fund I top 1%、50x–200x markup 保留为 sponsor claim。
6. 用 Business Insider 补技术评估 rubric，同时发现 4,000 万美元 second fund 与官方 2,500 万美元 Fund II 冲突，没有强行统一。
7. 用微信搜索和小红书采样中文世界：钛媒体 2023 长访谈提供高密度历史信息，小红书只作为个人品牌传播小样本。
8. 对 portfolio 只复核当前 46 个公开卡片、8 个 featured 案例和 vault 已研究公司交集，没有一次导入全部 46 家。
9. 导入官网原始字标，并保存首页、团队、portfolio、Alpha Program 四张有研究意义的页面截图。

## 这轮改变了什么判断

初始理解是“Leonis 对 Agent thesis 很系统”。完成后判断更具体：

- **成立部分：** 研究索引、Viktor 来源、Alpha Program、research affiliates 与机构自述 Alfa 能连成 research-to-sourcing 系统；portfolio 也确实出现 execution、context、gateway、payments、eval、GTM 等连续层。
- **需要降级的部分：** 没有证据证明 Alfa 的命中率、IC 的制度化程度或 Fund I 回报；系统化研究不等于系统化决策，更不等于已验证业绩。
- **组织层变化：** 2023 的 Val Gui 不能沿用为 current partner；当前公开核心是 Jay、Jenny、Liang，Isaac 为 CFO。
- **资本层变化：** Form D 的 0 sold 是 2024 启动时点，不是募资失败；ADV GAV、Fund II subscribed capital 和媒体 4,000 万美元描述是不同口径。

## 工具反馈

### Pinix / site

Pinix command 通道恢复后，browser、site、screenshot 在本轮均正常。微信搜索能返回约 94 条候选并解析文章正文；小红书能返回 note ID、作者和互动快照。继续遵守：搜索 count 只作候选规模，不作市场份额。

### SEC Form D adapter

新 `sec-formd` 的 `filings` 与 `filing` 能稳定解析 Leonis 原始 XML。但最初 `search-issuers` 对精确名称 “Leonis Capital Fund II” 返回空，原因是 SEC efts 无召回，Atom fallback 又漏掉 root-level `company-info`。真实样本反馈后，site-forge 修复并发布 0.0.10，现可返回 CIK `0002008420`。

这说明候选发现和已知 CIK 读取必须拆开：已知 CIK 时优先 `filings/filing`；名称搜索只负责候选，不应作为 no-hit 的唯一证据。

### Memex

本轮继续使用 `upsert`、`source add` 和字段关系，正文手工写中文。工具侧仍需解决：`source add --about-investor` 的一致入口、正文修改后的自动 refresh/status，以及批量验收；相关问题已交 cici-mmx。

## 对 SOP 的增量

本轮没有推翻 [[method.investor-research-sop-v0]]，只补两条操作细节：

1. 监管检索分为 entity discovery、filing history 和 raw filing parsing；名称 no-hit 不等于无 vehicle。
2. Form ADV 的 private fund GAV、Form D offering/sold 和公司公告 subscribed/closed 是三种口径，必须并排而不是互相覆盖。

## 停止条件判断

身份、Fund II、当前团队、研究/决策 rubric、8 条已有投资边、Alpha Program、中文认知、监控入口和关键 no-hit 均已收口。继续搬运 38 家长尾 portfolio 或追逐弱社区样本只会增加边际信息，因此本轮可以停止。

后续触发器：新 Form D/A 或 ADV、Alpha cohort 数据、Alfa 可验证案例、current team 变化、4,000 万/2,500 万口径解释，以及 Agent infra 新 portfolio。
