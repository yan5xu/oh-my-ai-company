# Relevance AI 本轮调研过程与反思（2026-07-15）
## 本轮从哪里进入

本轮不是从融资新闻开始，而是从 AI employee / workforce 赛道覆盖缺口进入。先查 vault，确认 [[company.relevance-ai]] 尚未建档，再沿官网、docs、客户、融资、人物、流量、launch、社区与中文内容展开。

## 实际运行路径

1. **官网与历史定位并读**：当前首页是 Specialist AI Agents；2021 融资稿仍是 developer-first vector platform；2023 HN/PH 是 Ask Relevance 与 Document AI。由此重建演化，而不是把当前文案倒推到历史。
2. **Docs 深审**：拆 eval、approvals、tasks、analytics、OTEL、MCP、security、limits 和 pricing，区分营销词与真实机制。
3. **客户证据阶梯**：先读供应商案例，再找客户本人 LinkedIn。Send Payments 的客户侧治理/部署表述提升了采用判断，但其整体运营指标没有被强行归因给供应商。
4. **融资建图**：三轮官方材料交叉，创建六家机构与十一条 round-specific investment；轮次总额不向单家拆分。
5. **流量审计**：记录六个月月线、渠道、地域、品牌词和 similar sites；发现月线合计与 top card 总量冲突后，保留两套口径而不“修平”。
6. **社区与中文世界**：Reddit/G2 看使用摩擦；微信、经济观察网、小红书看中文认知。小红书高热结果必须打开正文，确认 Relevance AI 是工作流核心而非搜索噪声。
7. **产品体验**：本轮 profile 打开 app auth 出现 500，只记录为本地体验失败，不推导服务宕机。
8. **视觉资产**：保存官网、Evals、Analytics、客户案例、团队和流量图，避免报告只剩抽象功能。

## 本轮纠错

### Product Hunt 同名污染

检索到一个 2020 年名为 Relevance 的 Product Hunt 产品，maker、域名和主体均不匹配。本轮没有把它写进公司 launch。结论：PH 不只核标题，还要核 domain、maker、时间和产品描述。

### Similar sites 不是竞品

第三方数据返回 vertical AI、workflow、营销工具、社交平台等混合结果。它们只能作为候选种子，必须再用产品层、buyer、workflow ownership 和 deployment model 分类。

### 高互动不等于深度采用

小红书 4,700+ likes 的笔记确实使用 Relevance AI，但只是跟教程搭销售背调 Agent。它证明中文教程扩散和低代码上手，不证明企业采用或留存。

### 客户指标不自动归因

Send Payments CEO 同时公开公司 AI Agent 运营指标和 Relevance AI 平台采用。两条信息有关联，但没有证据证明所有 46%/20%/$2M 指标均由该平台单独贡献，因此正文分开陈述。

## 与前几轮相比的增量

回看 Ema、Raft、Bloome、Hyperbrowser 后，本轮只增加五个候选动作，不升级为固定模板：

- **产品演化三点对照**：历史融资定位、早期 launch 与当前官网并排，防止 current positioning 覆盖历史。
- **客户证据的 attribution gate**：客户确认采用不等于客户所有 KPI 都归因给供应商。
- **官网动态数字审计**：营销组件中的任务量/成本/通过率先判断是 demo 还是运营数据。
- **平台能力读反面条款**：prompt injection、redaction、single tenancy、limits 的限制文字往往比功能列表更能说明成熟度。
- **同名产品实体校验**：Product Hunt、LinkedIn、X 等平台必须核 domain/maker/handle，不按标题合并。

## 工具反馈

- Xiaohongshu adapter 的 search → note 闭环可用，必须使用 search 返回的带 token URL；裸 note URL 会报缺少 token。
- Reddit thread adapter 能拿到完整评论树，但推广/affiliate 噪声需要人工降权。
- browser read 能抓到 G2 正文；样本量和平台 AI 摘要必须分开。
- linux.do 与 V2EX 当前缺少可用 site alias，不能把“本轮未抓到”写成“没有讨论”。

## 最小闭环完成条件

主体、创始人、融资边、持续触点、产品/安全 docs、至少一条客户侧证据、流量快照、社区反证、中文认知、视觉资产、takeaway、过程记录与 `issues=0`。本轮满足后才可 public-ready。
