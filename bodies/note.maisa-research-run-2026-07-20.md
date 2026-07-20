> **本轮目标**：从官网 seed 出发，判断 Maisa 的产品机制、治理边界、融资团队、商业规模与外部采用证据，并把新账号、投资关系、概念和证据资产写回 vault。

## 实际路径

1. 先查 vault，确认没有 Maisa 主体，仅有泛化 digital worker 词汇；
2. 读官网产品组：homepage、Digital Workers、Build、Manage、Trust、Chain of Work、成本与 n8n 对比；
3. 读两轮融资、TechCrunch、Forbes、NFX、Forgepoint，拆开官方、媒体与投资人证据；
4. 用 LinkedIn company/profile/employees 与 X user/search 验证创始人、团队角色、发布和 ARR 自报；
5. 对官网 logo 做客户侧精确检索，并单独读取 Santander 联合演讲；
6. 查 HN、Reddit、微信、Product Hunt 和 YouTube；域名搜索只用 verified_count 判断精确社区命中；
7. 从 DOM 的 lazy image、X video poster 和 selector screenshot 同时提取原图与页面状态；
8. 尝试 Similarweb，因登录态失效只记录 unavailable，不制造数字。

## 本轮校正

- 仅看首页容易把 Maisa 写成泛化“AI employee”；读 KPU、n8n 对比和 Chain of Work 后，核心应改写为 runtime-formed process + execution receipt。
- logo 不是客户证据。客户侧 no-hit 后，Santander 只能写成具名合作/联合演讲；其他 logo 保持 vendor-reported relationship。
- “deterministic”必须拆成 plan、code execution、validation 和 end-to-end outcome 四层，不把代码可复现外推为系统零幻觉。
- Reddit/HN 的 count 不等于声量。Reddit 10 个候选只有 1 个精确域名命中；新的 verified_count 语义有效避免了假阳性。
- 图片策略继续采用“DOM 原图优先 + 页面截图补状态 + 视频 poster 补产品界面”，没有把纯渐变背景放入资产。

## 工具与缺口

- Pinix browser/site、LinkedIn、X、HN、Reddit、微信和 YouTube transcript 本轮均可用；YouTube 对目标视频明确返回 empty transcript，符合空壳红线。
- Similarweb 登录过期，流量维度未完成；这是外部登录状态，不用搜索估算替代。
- Product Hunt 精确检索无结果；没有硬造 launch。
- 官网 Elementor selector screenshot 偶发 target closed，并行截同一 tab 不稳定；串行重试可完成。
- 账号已加入 X `AI Product` / `AI Founder` lists，深挖转为持续监控。

本轮不是形成永久模板；可复用增量是：对“可靠 Agent”主张按 planning/execution/validation/outcome 分层，并把 execution receipt 作为独立研究对象。
