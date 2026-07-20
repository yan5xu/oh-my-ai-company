# Viktor

![Viktor：AI for the rest of us](assets/viktor/hero.png)

## TL;DR

Viktor 是一个常驻 Slack 和 Microsoft Teams 的横向 AI employee。用户不用迁移到新的 Agent 工作区，而是在已有频道、私聊和 thread 里交任务；Viktor 在云端持有持久计算环境，连接企业工具，交付报告、dashboard、内部应用、代码和周期性工作流。

这次补强后的核心判断是：**Viktor 已经获得了比普通聊天机器人更完整的组织状态和执行责任，但还不是成熟的企业控制面。**

- 它拥有持久 workspace、频道历史、内部 skills/notes、集成、定时任务和逐任务用量记录，能形成跨时间的责任连续性。
- 它的任务合同仍主要存在于自然语言 thread 和 standing instruction 中，没有公开证明 owner、dependency、accepted outcome、补偿事务等结构化对象。
- 它的权限治理是“连接范围 + 频道成员关系 + read/write scope + 人工确认”的组合；高风险动作可审批，但大量 HITL 仍是写进 prompt 的一句话，不是完整 policy engine。
- 定时任务支持创建、查看、暂停、恢复和成本拆解；但官方自己披露，内部 236 个 recurring routines 中有 53 个超过一个月没有产出，当前建议依靠 failure alert、heartbeat 和人工月度审计兜底。没有找到原生 retry/backoff、事故管理和通用 rollback 的公开证据。
- Credits 的事后归因较透明，但事前预算预测仍弱。第三方实际使用样本出现每天约 9,000 credits、每月约 500-750 美元，也有长 thread 快速消耗 credits 的反馈。
- 客户侧与供应商案例足以证明真实生产使用和较短 time-to-value，但不足以推断留存、续约、accepted-outcome rate、human intervention rate 或长期单位经济性。

因此，在“AI Agent 如何进入公司”的市场图里，Viktor 最适合代表：**借 Slack/Teams 降低分发阻力的成品 AI employee。** 它证明现有协作入口能承载长期 Agent，但也暴露了一个边界：进入组织并不自动等于获得完整组织状态，更不等于平台已经承担了执行失败和业务结果责任。

## 它如何进入公司

![通过 Slack 或 Teams OAuth 安装](assets/viktor/slack-teams-install.png)

Viktor 的产品入口不是独立 Agent workspace，而是 Slack / Teams OAuth。官网流程只有三步：添加到协作工具、连接企业系统、在频道或私聊里分配第一项工作。当前未登录产品 smoke 也确认，Web 产品入口只提供“使用 Slack 继续”或“使用 Microsoft Teams 继续”，没有独立账号密码入口。

![未登录入口只能通过 Slack 或 Teams 授权](assets/viktor/signin-gate.png)

这解决了传统企业 Agent 的第一层阻力：员工不必切换到新应用，任务、澄清、审批和交付仍发生在熟悉的协作现场。它比新建工作区更容易分发，也能继承频道成员关系和对话上下文。

代价是状态完整性受入口约束：Slack/Teams 适合消息和协作，但不天然拥有完整的任务合同、依赖图、accepted outcome 和运行 incident。Viktor 必须在消息层之上补记忆、skills、scheduled routines、用量和审批；目前公开证据显示这些能力已经存在，但仍没有形成 [[company.paperclip]] 那种 Issue-native work container。

## 产品机制：从消息到交付

Viktor 的产品栈可拆成五层：

1. **协作入口**：Slack / Teams 频道、私聊、thread、mentions。
2. **组织状态**：频道历史、workspace context、内部 skills/notes、用户和团队偏好。
3. **执行环境**：每个 Viktor 的持久云端 Linux computer、文件系统、shell、代码执行环境和浏览器。
4. **工具访问**：OAuth integrations、MCP、API、read/write scopes、channel membership 和 credential injection。
5. **持续运行**：scheduled tasks、usage/cost breakdown、pause/resume、failure notification 和人工审计。

![连接企业工具并把结果交回协作现场](assets/viktor/integrations.png)

官网将“完成工作”定义为交付 artifact，而不只是生成文字：PDF、表格、dashboard、presentation、deployed app、code commit 或 recurring report。官方视觉示例也把交付结果直接发回 `#results` 频道。

![Viktor 将分析结果和可访问 artifact 发回频道](assets/viktor/result-delivery.png)

### 组织状态与记忆

官网 FAQ 的当前口径是：

- 每个 Viktor 有一个持久 cloud computer 和 persistent workspace。
- 它会读取被邀请进入的频道和对话，观察团队流程，建立 knowledge base。
- 学到的流程会写入内部 “skills”，可理解为持续更新的工作笔记。
- 断开 integration 会停止新的数据访问，但已经形成的 notes、summaries 和 derived context 可能继续保留。
- 用户可以执行 Clean Workspace 或完整 workspace data wipe。

这说明 Viktor 的记忆不只是聊天历史，而是“原始协作上下文 + 派生技能/摘要 + 持久文件与执行环境”。它足以支撑同一角色跨天、跨任务工作，也解释了为什么客户会把它当成团队成员而不是一次性 bot。

但公开材料存在一个重要冲突：当前首页 FAQ 说 integrations 在团队内共享、访问控制仍主要是 workspace-level，per-user scoping / RBAC / private mode 在 roadmap；2026 年 2 月 changelog 又写了 per-user channel privacy、个人 skills 和私人频道/DM 隔离。更可能的解释是“Slack 频道可见性”和“集成/派生上下文权限”是不同层，或不同页面更新时间不一致。没有账号内验证前，不能把它合并成“已经实现完整逐人权限隔离”。

### 任务合同与 scheduled workflow

Viktor 的 recurring task 由自然语言 standing instruction 和 schedule 组成。用户可以让一个已经完成的任务在每天、每周或指定时间重复运行。Changelog 已证明它至少支持：

- 查看 scheduled task；
- 暂停和恢复，暂停后保留配置并跳过计划运行；
- 按 scheduled task 查看用量和成本；
- 为 recurring task 选择模型；
- 在任务和 SDK / flow API 中操作 pause/resume；
- 自定义 scheduled task 发信人名称。

这已经不只是“聊天后提醒”，而是持久工作单元。但任务合同主要靠 instruction 描述，没有公开的 owner、dependency、reviewer、accepted outcome、idempotency 或 compensation schema。Thread 可以保存澄清和纠错，却不能证明机器可判定“业务结果已经被接受”。

### 失败、重试与生命周期

官方文章《Why automations die quietly》给出了本轮最关键的反证。Viktor 审计自己的 workspace，发现 236 个 standing routines 中有 53 个超过一个月没有产生输出，占 22%。文章列出的原因包括 OAuth 过期、频道或文件夹改名、上游数据结构变化等。

官方当前建议是：

- 在任务说明中要求失败时向 alert channel 发消息；
- 另建 heartbeat 定时任务检查应有产出是否出现；
- 每月让 Viktor 列出 routine、schedule、data source 和 last successful run，人工做审计。

这证明产品已经真实运行到足以暴露 silent failure，但也说明失败治理仍偏 operator-authored。暂停/恢复是生命周期控制，failure alert 和 heartbeat 是检测机制；它们都不是原生自动 retry、指数退避、补偿事务或通用 rollback。本轮没有找到这些机制的公开文档或账号内证据。

## Runtime 与 browser automation

官方称每个 workspace 都有持久、隔离的完整 Linux sandbox，带文件系统、shell 和代码执行环境；凭据由基础设施注入，模型本身不直接看到 token。Viktor 还可以打开真实网页、填表、抓数据和截图。

但产品的主要稳定路径仍是 API / OAuth integration。官方对比文章明确把 API-based work 作为适合 recurring、结构化企业任务的主路径，把浏览器操作描述为“可以做”，而不是核心可靠性证明。

本轮没有获得以下公开指标：

- browser task success rate；
- 页面漂移、验证码、超时和登录过期的处理率；
- retry/backoff 策略；
- 幂等和副作用回滚；
- sandbox 资源上限、数据导出和可迁移性。

因此能确认的是“有持久 sandbox 和 browser capability”；不能确认的是“浏览器执行已具备企业级可靠性”。

## 权限、审批、升级与审计

Viktor 的实际访问能力由四道门共同决定：

1. integration 是否连接；
2. Viktor 是否属于对应频道；
3. OAuth / tool 是只读还是可写；
4. 数据 scope 是否覆盖目标对象。

官网和安全材料还给出以下控制：

- 高风险或不可逆动作前要求人工确认；
- Slack Connect 外部共享频道的内容先转私聊确认，再发回频道；
- issue report 先起草，获批后发送；
- 用户可以保存“always approve this tool”；
- broken OAuth 可以一键 reconnect；
- 可断开 integration、暂停任务、停用用户、Clean Workspace 或完整删除数据。

供应商称 workspace audit log 会记录 triggering prompt、tool call 和 integration；部分 workflow 示例会显示来源、拟执行动作、歧义置信度、原始链接、时间戳和人工 approver。这些足以证明它认真做 execution receipts，但仍主要来自官方文档，未做采购级或账号内验收。

更重要的是，Viktor 官方自己把 HITL 定义为“a sentence, not a system”：用户在 instruction 里写“先展示，确认后再发送”，并通过 trust ladder 从 draft-only、exception approval 逐步放开到低风险自治。这是一种实用的渐进自治方法，但不是完整 policy engine。

所以需要分开理解：

- **已存在**：OAuth scope、频道成员关系、read/write boundary、approval button、tool-level saved approval、audit claim。
- **部分存在**：escalation 可以通过 instruction、alert channel、Slack DM 和 heartbeat 组合实现。
- **未验证**：action-level policy matrix、role hierarchy、approval SLA、通用 rollback、事故处理和独立 validator。
- **不是 rollback**：disconnect、pause、Clean Workspace 能停止或清空后续状态，但不能撤销已经发出的邮件、广告修改或外部系统写入。

## Credits：透明归因，不等于预算治理

当前 Team 计划为每月 50 美元，包含一个 shared workspace 和 20,000 monthly credits，不按 seat 额外收费。官方给出的任务消耗区间随页面版本略有差异：

- quick Slack question 约 50-100 或 quick task 约 100-300 credits；
- deep research / multi-step workflow 约 500-2,000 credits；
- full project 约 2,000-5,000 credits；
- 20,000 credits 大约覆盖 40-200 个任务，取决于复杂度；
- plan credits 最多滚存一个月，trial / bonus credits 不过期。

Changelog 已加入 thread-level、scheduled-task-level、user-level 用量与成本拆解，也允许给定时任务选择模型。这提高了事后归因：用户能知道是哪一个 thread、哪个 scheduled task、哪个用户消耗了 credits。

但“看见花了多少”不等于“能在执行前预测预算”。本轮没有找到：

- 单任务 hard cap；
- accepted outcome 对应成本；
- failed run / retry 的统一退款规则；
- monthly budget policy 和超额自动停止；
- 业务价值与 credits 的对齐指标。

第三方 [[source.efficient.viktor-review-2026-05-27]] 称其团队每天约使用 9,000 credits，月账单约 500-750 美元；[[source.trustpilot.viktor-reviews-2026-07-08]] 也出现长 thread 快速消耗 credits 的反馈。这些都是小样本，不能推断平均客户账单，但足以说明 credit-based pricing 与“雇一名员工”的定价叙事之间仍有张力。

## 采用与结果证据

### TWL：短周期部署成立，长期留存未知

Viktor 官方案例称，约 25 人、运营四个 Shopify stores 的 TWL 在 15 天内建立了 12 个 scheduled workflows，分布在 8 个 Slack channels，替代约每天两小时手工工作。一个 daily P&L 在 15 分钟内建立、一次调整后于每天 7 点运行；其他流程覆盖 trade log audit、Klaviyo、Asana 和跨频道跟进。

这是具体的 workflow 数量、时间和组织环境，但仍是供应商案例，窗口只有 15 天。它能证明 time-to-first-workflow 和多系统执行，不能证明长期 retention、错误率、accepted outcome 或 ROI。

### Element Turf：客户侧确认比官网 testimonial 更强

Element Turf 创始人 Krysta Mueggenburg 在公司 LinkedIn 页面公开描述前 20 天的使用：连接 Aspire、Gmail、ClickUp、BambooHR，取消每年约 3,000 美元的 Trainual，并建立 62 个 workflows，覆盖 15 个 tools 和 7 个 inboxes。Element Turf 自己的网站也确认，团队将 AI 工作流用于行政、crew、HR 和客户沟通。

这是目前更接近客户侧的 adopted-use evidence：真实经营者、约 25 人组织、明确系统和短期部署结果。它仍不能证明 62 个 workflow 的 active rate、accepted outcome、介入次数、续约或长期节省。

### 规模口径不能合并

公开材料出现过 2,000+ organizations、40,000+ teams 和 45,000+ teams 等口径。融资稿称 2026 年 2 月 public launch 后约 10 周达到约 1,500 万美元 annualized run rate，并于 2026 年 5 月宣布 7,500 万美元 Series A。规模数字具有时间和定义差异，不能把 organization、team、signup、active workspace 和 paying customer 当成同一指标。

## 融资、团队与资本网络

创始人是 [[person.fryderyk-wiatrowski]] 和 [[person.peter-albert]]，多篇材料称两人有 Meta / Meta AI 背景。2026 年 5 月，[[investor.accel]] 领投 7,500 万美元 Series A，参与方包括 Bek Ventures、Kaya VC、Inovo VC、Tenacity Capital 及 Slack、Vercel、Synthesia、Framer、Deel 等产业人物。既有投资人包括 [[investor.leonis-capital]]、Oxford Seed Fund、Nat Friedman、Daniel Gross、Charlie Songhurst 等。

资本网络见 [[note.viktor-investment-network-2026-07-08]] 和 [[note.viktor-investor-adjacent-map-2026-07-08]]。这里最有解释力的不是金额本身，而是三层组合：早期 autonomous agent 技术确信、Accel 的 team-focused workplace agent thesis，以及 Slack / enterprise operator network 对分发入口的背书。

## 增长与流量

[[source.similarweb.viktor-2026-07-08]] 显示官网流量并非单一渠道：Direct 较高，Paid Search、Paid Social 和 Display 都有贡献；Product Hunt、Luma、媒体和工具站参与分发；官网出站中 app.viktor.com 占比很高，说明 marketing site 到产品入口形成明确路径。

这些是第三方估算，只能用于判断渠道结构和融资传播前后的方向变化，不能当 MAU、付费用户或留存。本轮补强没有把流量数据写成 adoption 结论。

## 对专题的结论

### Viktor 真正获得了什么

- 通过 Slack/Teams 获取低迁移成本的组织入口。
- 通过频道历史、skills/notes、持久 workspace 和 integrations 获取跨时间状态。
- 通过 scheduled task、pause/resume、usage breakdown 获取持续工作单元。
- 通过 OAuth scope、channel membership、approval 和 audit claim 获取基础治理。
- 通过 sandbox、API 和 browser 能力承担部分外部系统副作用。

### 它还没有公开证明什么

- 完整的逐人/逐资源权限隔离；官方材料自身存在冲突。
- 结构化 accepted outcome 和任务依赖合同。
- 原生 retry/backoff、failure policy、补偿事务与通用 rollback。
- browser runtime 的成功率和 incident rate。
- cost per accepted output、human intervention rate、长期 retained workflows。
- 独立客户留存、续约、NRR 和任务成功率。

### 最终判断

Viktor 的优势不是“比其他 Agent 多几个功能”，而是把一个持久执行角色放进了公司已经存在的协作拓扑里。它用 distribution 换取更快 adoption，再用 memory、skills、integrations 和 scheduled routines 补组织状态。

这个模型适合快速进入中小企业和跨职能团队，也适合重复报告、研究、数据同步、内部工具和轻量运营流程。它不应被写成成熟的企业 Agent 控制面：当前治理仍依赖自然语言说明、人工审批和运营纪律，silent failure、credits 预算和外部副作用回滚都是未闭环问题。

## 待验证

1. 完成 Slack 或 Teams 授权后的账号内 smoke：memory、skills、scheduled task、usage、audit 和 integration settings。
2. 验证 per-user channel privacy、shared integrations、workspace context 和 roadmap RBAC 之间的真实权限边界。
3. 建一个可回滚和一个不可逆 workflow，记录审批、失败、retry、人工介入和最终 accepted outcome。
4. 测量 browser task 的成功率、验证码/页面漂移处理、重试和失败成本。
5. 获得 30/90 天 retained workflow、续约、介入次数和 accepted output 成本数据。

本轮未登录 smoke 见 [[source.website.viktor-signin-smoke-2026-07-20]]；研究过程与反思见 [[note.viktor-runtime-governance-refresh-2026-07-20]]。

## 证据库

### S1 官方

- [[source.website.viktor-home-2026-07-08]]
- [[source.website.viktor-product-2026-07-08]]
- [[source.website.viktor-security-2026-07-08]]
- [[source.website.viktor-pricing-2026-07-08]]
- [[source.website.viktor-changelog-runtime-2026-07-20]]
- [[source.blog.viktor-automation-failure-2026-07-20]]
- [[source.blog.viktor-human-in-loop-2026-07-20]]
- [[source.blog.viktor-runtime-access-audit-2026-07-20]]
- [[source.blog.viktor-tool-access-2026-07-20]]
- [[source.blog.viktor-security-diligence-2026-07-20]]
- [[source.blog.viktor-workflow-audit-2026-07-20]]
- [[source.website.viktor-twl-case-study-2026-07-20]]
- [[source.yahoo.viktor-series-a-2026-05-19]]
- [[source.leonis.viktor-ai-employees-journey]]

### S2 客户侧 / 强第三方

- [[source.linkedin.element-turf-viktor-2026-07-20]]
- [[source.website.element-turf-ai-workflows-2026-07-20]]

### S3 社区与第三方使用

- [[source.efficient.viktor-review-2026-05-27]]
- [[source.trustpilot.viktor-reviews-2026-07-08]]
- [[source.reddit.viktor-slack-agent-feedback-2026-07-08]]

### S4 / 边界

- [[source.website.viktor-signin-smoke-2026-07-20]]
- [[source.producthunt.viktor-2026-07-08]]
