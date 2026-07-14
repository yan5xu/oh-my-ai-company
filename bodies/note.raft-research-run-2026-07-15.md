# Raft 本轮调研流程与反思

这是一轮实际过程记录。新增动作仍是候选方法，不代表所有公司以后都机械执行。

## 本轮怎么跑

1. **从相邻公司进入**：用 [[company.helio]] 作为 AI workforce / agent-native workspace 对照，先问两者控制的是预制员工、协作空间还是 runtime。
2. **官方产品与实现并行**：读官网、pricing、Docs、GitHub、Terms/Privacy；用 task、external agents、Connected Apps 和 Login with Raft 还原产品层级。
3. **追原型而非只找 launch date**：从创始人 X 还原 1 月 Slack demo、Kimi 末期多 terminal 工作方式、5 月正式发布和 6 月改名。
4. **把 dogfooding 当 operational proof**：检查一项功能如何在 Raft 内被调研、实现、验证和发布，区分“内部可运行”与“市场已验证”。
5. **拼接旧域和新域**：分别读取 `slock.ai` 与 `raft.build` 的月度、渠道、地域和关键词，避免改名让增长判断断裂。
6. **社区先找反证**：X、V2EX、Linux.do、微信、小红书、Reddit、HN、PH 同时检索；重点保留重复劳动、token、上下文、闭源/隐私等反方样本。
7. **从社区线索反查融资**：常规融资数据库为空后，沿社区提及进入戴雨森播客，拿到 Upgrade Capital 投资 Slock 的直接表述。
8. **图文资产化与监控**：保存官网 DOM 截图、Docs 产品图、真实 meetup 照片；官方与创始人 X 加入 list；写入 company/person/investor/investment/source/touchpoint/traffic/note/concept。

## 本轮改变了什么判断

- **开始时**：Raft 容易被归为 Helio 的近似产品，都是“人和 Agent 在一个 Slack-like workspace”。
- **补完后**：Raft 的 wedge 是把用户已有的本地 runtime 变成持续团队，并用 AX 协议解决 turn-based agent 的在场、过时和责任冲突；Helio 更偏预制 teammate 与业务责任。
- **开始时**：多 Agent 群聊可能只是表现层创新。
- **补完后**：inbox、held draft、room version、task owner、app identity 是更深的控制面；但社区反证说明横向协作是否优于层级 orchestrator 仍未解决。
- **开始时**：6 月新域只有约 1.7 万访问，看起来规模偏小。
- **补完后**：旧域 4–5 月已快速增长，6 月是品牌和域名迁移期；单看新域会漏掉产品历史，单看旧域又会误判衰退。
- **开始时**：公开融资为空。
- **补完后**：投资方管理合伙人的播客原话足以建立 Upgrade Capital 投资关系，但仍不能补写金额和轮次。

## 失败、冲突与降级

- Product Hunt 未找到正式 listing；HN 只有低互动文章提交，不把它们写成 launch 主线。
- Reddit 没有聚焦讨论，只写公开样本不足。
- LinkedIn employee search 返回自报关联成员，可能混入客户/顾问；只作线索，不反推正式团队规模。
- Similarweb 的 `slock.ai` 总量卡片与月度图表冲突，只保留可复核月度序列；`raft.build` 的 non-brand 词实际仍是 Slock 品牌词，品牌分类降级。
- DAA 页面标注 6 月 15 日发布却使用截至 6 月 21 日样本；保留冲突，不替官方修正日期。
- Upgrade Capital 投资关系有强证据，但金额、轮次、日期和其他投资人未找到，字段留空。
- 官网用户 logo、证言、DAA 与活动人数均为官方自报，不能替代独立客户、留存或收入数据。
- Connected Apps / Login with Raft 有 docs 和 UI，不代表已形成第三方生态。

## 本轮候选方法增量

1. **Rebrand continuity audit**：改名公司要同时查旧名、旧域、旧账号、关键词和 referral；报告按月拼接，不把迁移噪声解释成增长或衰退。
2. **Self-reported metric consistency audit**：官方指标除定义和样本外，还要核发布日期与样本截止日是否自洽；活跃指标不能替代价值指标。
3. **Dogfooding evidence ladder**：从“团队说自己在用”升级检查真实工作项、角色分离、验证证据、不可逆 gate 与发布结果。
4. **Hidden funding path**：数据库为空时，从投资人播客、portfolio、创始人关系与社区线索反查；拿到直接表述才建强关系，金额和轮次继续留空。
5. **Counter-thesis mapping**：把社区 objection 映射到产品控制面；功能回应 objection 只能说明团队意识到问题，不能宣称因果或已经解决。
6. **Visual mix**：同时保存 DOM 截图、官方产品图与线下真实照片；只截官网会让后续读者看不见使用场景和社区密度。

## 本轮工具观察

- Twitter adapter 能找到创始人原始长帖，并成功把 `raft_hq`、`istdrc`、`zty0826` 加入对应 lists。
- browser selector screenshot 很适合保留网页交互 UI；Docs GitHub raw assets 更适合保留高清产品面。
- 微信 adapter 精确长查询未命中时，通过已抓到的公开材料索引反查原文链接；没有把空搜索结果当成文章不存在。
- Memex `asset import --name` 当前会取 basename，传入 `raft/...` 没有保留子目录，需要导入后再整理到 `assets/raft/`。这是轻微 ergonomics 问题，未阻塞本轮。

## 是否更新方法手册

回看 [[note.helio-research-run-2026-07-14]]、[[note.kernel-research-run-2026-07-13]] 与现有 [[method.product-research-workflow-v0]] 后，只把上述六项作为 Raft 样本增量附到方法手册，不改写为所有产品的固定模板。后续至少再遇到一次 rebrand 或官方指标时间冲突，才考虑提升为稳定 SOP。
