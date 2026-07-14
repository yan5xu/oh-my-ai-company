# Floatbot 本轮调研流程与反思

本轮从“AI employee / Agent-native workspace”队列进入，但没有沿用早期创业公司的 launch 模板。先读官网、About 和 FloatSpace，发现 Floatbot 已运营多年后，研究重点改为“能力如何演进”和“垂直交付是否真实”。[[company.floatbot]]

## 实际路径

1. 官网与 About：建立 2017–2025 产品路线。
2. FloatSpace 与 X：拆出 2025 年 5 月介绍、10 月预览、11 月正式发布的分阶段 launch。
3. 客户案例：同时记录结果数字与实施周期、幻觉、UAT、客户投入。
4. 合作伙伴：用 Snapsheet、Socotra 反查系统集成与渠道，而非只读公司新闻稿。
5. 融资核验：用 Times of India 纠正数据库把 accelerator/incubator 当 investor 的混淆。
6. Similarweb：直接读取 Highcharts 原始月度序列，区分主域 70,386 与含子域 144,291 两种口径。
7. 社区扫描：Reddit、HN、微信、小红书等结果大量是近名噪声，明确记为“未发现有效讨论”。
8. 图文资产：优先提取官网 DOM 背景与产品区块，再用 selector 截岗位化 Agent 和工作空间模块。

## 本轮调整

- 成熟企业软件不应只问“什么时候 launch”，而要做产品代际与客户迁移时间线。
- 案例研究必须把结果和交付成本放在同一段，防止 ROI 数字遮蔽实施负担。
- Accelerator、incubator、showcase、portfolio 和 investor 必须分别核验；数据库标签不直接生成投资边。
- 同一流量面板可能同时展示主域序列与含子域汇总，必须读取原始序列并标注口径。
- 同一 tab 上并发 selector screenshot 会互相滚动，导致截错区块；DOM 截图应串行执行。

## 仍缺

- FloatSpace 真实付费客户、席位、留存与独立用户反馈。
- 当前融资状态与是否完成 2021 年计划中的 A 轮。
- SOC 2 / HIPAA 等合规声明的独立证书核验。

本轮没有把这些缺口用数据库摘要或供应商口径补齐。后续更新 [[method.product-research-workflow-v0]] 时，应先与 Moxt、Helio、Raft 等多轮记录对照，再决定是否上升为稳定方法。
