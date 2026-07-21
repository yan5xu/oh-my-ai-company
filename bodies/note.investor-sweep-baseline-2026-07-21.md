# 投资机构全面摸排基线与批次设计（2026-07-21）

## 为什么先做覆盖审计

First Round 试点证明单家机构可以形成完整的 Investor -> Person -> Investment -> Company -> Concept -> Source/Touchpoint 网络，但把同样深度机械套到全部机构会失控。当前 vault 有 **179 个 investor、282 条 investment**，多数机构只和一家已研究公司相连。

因此“全面摸排”不等于“179 家全部写一万字报告”，而是先保证所有投资关系有可靠证据，再按网络价值决定机构档案深度。

## 当前核心覆盖

以下计数来自 2026-07-21 Memex 结构化关系；`公司数`按不同 company 去重，`投资边`保留同一公司不同轮次，正文字符数只用来发现明显空档，不代表研究质量。

| 机构 | 关联公司 | 投资边 | 当前正文 | 人物 / 来源 / 触点 | 初步状态 |
|---|---:|---:|---:|---:|---|
| [[investor.accel]] | 18 | 19 | 20,219 | 6 / 57 / 6 | 已深研，可作成熟机构参照 |
| [[investor.general-catalyst]] | 14 | 14 | 18,022 | 4 / 20 / 8 | 已补深，资本工具、人物与机制已结构化 |
| [[investor.y-combinator]] | 13 | 14 | 401 | 0 / 8 / 0 | 高交集，但 accelerator 机制未系统迁入 |
| [[investor.conviction]] | 13 | 13 | 12,645 | 4 / 23 / 8 | 已完成小型 AI-native 校准 |
| [[investor.leonis-capital]] | 8 | 8 | 17,669 | 4 / 15 / 8 | 已完成研究驱动小型 AI-native 机构样本 |
| [[investor.first-round-capital]] | 7 | 7 | 12,989 | 7 / 24 / 9 | 本轮完整试点 |
| [[investor.lightspeed-venture-partners]] | 7 | 7 | 14,243 | 0 / 36 / 0 | 机构报告强，结构化人物/触点债务高 |
| [[investor.andreessen-horowitz]] | 5 | 5 | 14,048 | 7 / 32 / 11 | 已完成多基金平台型校准 |
| [[investor.benchmark]] | 4 | 4 | 12 | 0 / 6 / 0 | 合伙制模型值得独立研究，当前空壳 |
| [[investor.bek-ventures]] | 4 | 4 | 1,082 | 0 / 8 / 0 | 标准档案候选 |
| [[investor.sequoia-capital]] | 3 | 3 | 18 | 0 / 1 / 0 | 品牌与 vehicle 容易混淆，当前空壳 |
| [[investor.sv-angel]] | 3 | 3 | 114 | 0 / 2 / 0 | 网络型早期机构候选 |
| [[investor.baidu-ventures]] | 3 | 3 | 642 | 0 / 0 / 0 | 中文/中美 AI 投资线候选 |
| [[investor.menlo-ventures]] | 2 | 4 | 179 | 0 / 3 / 0 | 同公司多轮，需区分关系深度与覆盖广度 |
| [[investor.index-ventures]] | 2 | 2 | 17 | 0 / 2 / 0 | 跨欧美 enterprise/infra 机构，当前空壳 |
| [[investor.union-square-ventures]] | 2 | 2 | 946 | 0 / 2 / 0 | thesis 型机构，已有少量内容 |

## 三级摸排协议

### A. 核心机构：完整 dossier

适用条件：通常关联 5 家以上公司，或虽数量较少但对 Agent/browser/AI infra 的产品与融资判断具有战略意义。

按 First Round SOP 跑完整机构身份、资本工具、当前人物、决策机制、partner clusters、投后系统、内容/社群网络、中文认知、图片、触点和 Graph。重点不是把 portfolio 搬完，而是解释这个机构如何形成判断与网络。

### B. 重复机构：标准档案

适用条件：关联 2–4 家公司，或在同一赛道连续出现。

最低交付：机构定位、当前关键人物、已验证投资边、相交公司 cluster、官方 portfolio/thesis、1 条判断 note、官网与核心账号触点。发现独特机制后再升级 A 级。

### C. 单次机构与个人投资者：证据卡

适用条件：只在一家公司或一轮融资中出现，尚无第二个网络信号。

最低交付：准确主体名/类型、官方 URL、对应 investment、证据 source 和基本消歧。不主动扩完整团队和 portfolio；当第二家公司、关键 thesis 或新关系出现时再升级。

## 优先级计算

优先级不是名气排序，而由四项共同决定：

1. **重复相交：** 连接多少不同已研究公司，而不是 investment 行数；
2. **战略相关：** 是否连续覆盖 Agent、browser、AI infra、AI employee 或公司控制面；
3. **资产债务：** 关系已经很多，但正文、人物、来源和触点是否仍为空；
4. **类型校准：** 是否能检验现有 SOP 在多阶段巨型机构、accelerator、个人品牌基金、family office、CVC 等形态下是否成立。

正文长度、社交关注和机构知名度都只能作为辅助信号。

## 建议批次

### 校准批：先验证 SOP 能否跨机构类型

1. **[[investor.andreessen-horowitz]]：** 多阶段、媒体化、平台团队庞大的巨型机构。它会迫使 SOP 处理 fund vehicle、sector team、内容网络和 portfolio 爆炸。
2. **[[investor.conviction]]：** 小型、AI 原生、个人 thesis 较强的机构。已有 13 家交集，但人物和决策网络缺失，适合检验“person-led fund”版本。

两家完成后，再决定哪些步骤固定、哪些改成机构类型分支。

### 第一批核心补齐

- [[investor.y-combinator]]：需要单独的 accelerator/batch/alumni/network 版本；
- [[investor.general-catalyst]]：已补 current people、Creation/Customer Value 等机制与当前 AI cluster；
- [[investor.leonis-capital]]：验证小型机构连续发现 agent infra 的能力来源；
- [[investor.lightspeed-venture-partners]]：不重写已有报告，优先补结构化人物与监控入口。

### 第二批标准档案

[[investor.benchmark]]、[[investor.sequoia-capital]]、[[investor.bek-ventures]]、[[investor.sv-angel]]、[[investor.baidu-ventures]]、[[investor.menlo-ventures]]、[[investor.index-ventures]]、[[investor.union-square-ventures]]。

### 长尾

其余大部分机构先保持 C 级证据卡。每完成一家公司调研，重新计算机构去重公司数；达到两家公司或出现明确 thesis 信号时，自动进入 B 级候选池。

## 当前决策

- 投资机构 SOP 已经 First Round、a16z、Conviction 三类机构校准，进入 `active v0`；
- 全面摸排采用三级深度，而不是统一模板；
- 校准批已完成；第一批的 General Catalyst 与 Leonis 已收口，下一步处理 Lightspeed 结构债务与 YC accelerator 分支；
- 投资关系的真实性优先于机构介绍的完整度；
- 每批结束重新计算覆盖表，防止旧优先级失真。

关联方法：[[method.investor-research-sop-v0]]。
