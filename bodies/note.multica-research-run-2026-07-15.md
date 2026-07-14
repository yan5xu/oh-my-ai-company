# Multica 调研过程、方法与反思（2026-07-15）
# Multica 调研过程、方法与反思（2026-07-15）

> 这是本轮真实过程记录，不是已经固化的通用 SOP。

## 这轮怎么跑

1. 先查 vault 中 [[company.raft]]、[[company.helio]]、[[company.superset]]，带着“协作容器、AI employee、coding workspace”三条对照线进入。
2. 官网与 use-case 页面 `browser read` 返回动态空壳，改用浏览器 DOM、官网代码和 docs；空壳内容没有进入结论。
3. 从官网概念继续下钻 GitHub README、代码结构、provider docs、Skills 和 LICENSE，核验 runtime、worktree、session resume 与许可边界。
4. 用 GitHub API/仓库历史还原创建、首发、release、贡献者和当前规模；没有只看 star 数。
5. 从创始人 X 和 LinkedIn 还原 Devv -> Multica 的团队连续性与 founder-led launch；融资信息因无法找到投资人和法律关系而停止扩写。
6. 用第三方网站数据观察 launch 后月度流量、渠道、地域、关键词、referral 与 social；把 similar sites 分为竞品、受众邻近和噪声。
7. 搜 X、LinkedIn、Reddit、HN、微信等社区。保留正向 workflow、质量/合并/插件瓶颈和“为什么不用现有工具组合”的反方问题。
8. 下载官网原始图片和产品截图并命名到 `assets/multica/`；报告不只放浏览器截图。

## 本轮新增的候选方法

### 开源主张必须做 license audit

首页“开源”不能直接进入报告。至少核验仓库 SPDX、LICENSE 原文、托管/商业限制、品牌条款和协议变更权。Multica 的修改版 Apache 说明 GitHub 可见与 OSI 开源不是一回事。

### 把 agent activity 与 accepted output 分开

stars、tasks、tokens、并发 Agent 和 handoff 都是活动指标，不等于业务价值。AI workforce 产品应继续找 review queue、accepted deliverables、rework、human interventions 与单位成本。

### 营销页面与实现文档做 claim delta

官网写 14 个工具、docs 列 15 个；官网暗示 Skill 自动复利，docs 展示的仍是手工创建/导入。差异不一定是造假，但能定位页面滞后和未实现愿景。

### 共域流量先解释访问对象

当 marketing、docs、app 共用域名，深参与度可能包含产品使用。不能把它当纯获客，也不能直接转成活跃客户。结构化快照要保留域范围和解释边界。

### Founder audience、GitHub referral、YouTube 要三线互证

本轮 launch 帖、referral 和 social 数据互相支持 founder-led/open-source/video GTM。单独看任何一条都容易高估：粉丝不等于用户，GitHub stars 不等于付费，视频播放不等于留存。

## 工具与资料问题

- 动态官网的 `browser read` 空壳需要 DOM readiness/fallback；本轮已遵守空壳红线。
- YouTube 描述和章节可读，但完整 transcript panel 未稳定加载，因此视频 source 标为 partial，未制造逐字引语。
- LinkedIn employees fallback 返回了无关人物；团队规模改用创始人访谈、公开职位和 GitHub 贡献交叉核验。
- Similarweb 顶部总量与月度图合计不一致；报告采用月度序列，并显式记录冲突。
- 微信文章中出现“标准 Apache 2.0、完全可商用”等二手错误，必须回到 LICENSE 原文。

## 还没有升格为固定 SOP 的原因

license audit 对 source-available 项目很重要，但不适用于所有闭源产品；accepted-output 指标对 AI workforce/agent collaboration 很关键，也需要在 Paperclip、Raft、Helio 等更多样本中复验。先把它们作为 Multica 这一轮的候选动作记录，再观察后续是否反复出现。

关联主体：[[company.multica]]；产品判断：[[note.multica-product-takeaway-2026-07-15]]。
