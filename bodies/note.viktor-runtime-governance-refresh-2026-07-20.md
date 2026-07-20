# Viktor 运行与治理补强：研究过程与反思

## 本轮触发

上位专题需要 Viktor 承担“通过 Slack/Teams 进入既有组织的成品 AI employee”主对照。旧卷宗覆盖产品、融资、流量和社区，但不足以回答：它到底获得了多少持续状态、如何运行 recurring work、如何处理权限、失败和成本。

## 本轮研究线路

1. 从当前官网 FAQ 拆 memory、workspace、data retention、shared integration 和 access control。
2. 逐条读 changelog，确认 scheduled task、pause/resume、usage breakdown、channel privacy 和 approval 的已发布能力。
3. 用官方 failure/HITL/access/security 文章寻找反证，不以功能页替代治理证据。
4. 回到客户侧材料，区分供应商案例和客户经营者直接确认。
5. 恢复浏览器后打开 signup/signin，验证真实登录门槛；没有 Slack/Teams 工作区授权，因此停止在未登录边界。
6. 补官网原始图片和登录页 DOM clip，不只使用全页截图。

## 关键反思

- 研究企业 Agent 不能只问“能做什么”，必须问状态、任务合同、runtime、权限、副作用、失败、成本和结果责任分别由谁承担。
- Changelog 往往比 homepage 更接近 shipped state；failure post 往往比 case study 更能解释产品成熟度。
- “HITL”不能作为单一能力。Prompt checkpoint、approval button、OAuth scope、escalation、audit 和 rollback 是不同机制。
- 暂停、断开和删除不是 rollback；能看到 credits 也不是预算治理。
- 官方口径冲突不应擅自调和。频道可见性、集成共享和派生 memory 可能属于不同权限层，账号内未验证前保留冲突。
- 恢复 browser 解决了页面和截图能力，但没有自动产生登录态。真实 smoke 到授权门槛即停止，不能把未登录观察扩写为产品体验。

## 对后续方法的增量

以后研究 AI employee / control plane，优先形成一张“责任分层表”：入口、状态、任务合同、runtime、权限、审批、失败恢复、rollback、成本、accepted outcome。每一格分别标注官方设计、账号内 smoke、客户侧证据和 no-hit，而不是给整家公司一个笼统成熟度。

关联：[[company.viktor]]、[[source.website.viktor-changelog-runtime-2026-07-20]]、[[source.blog.viktor-automation-failure-2026-07-20]]、[[source.blog.viktor-human-in-loop-2026-07-20]]、[[source.linkedin.element-turf-viktor-2026-07-20]]、[[source.website.viktor-signin-smoke-2026-07-20]]。
