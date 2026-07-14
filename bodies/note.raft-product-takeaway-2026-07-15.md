# Raft 产品判断

## 一句话

[[company.raft]] 不是一组预制 AI 员工，而是把用户已有的 Codex、Claude Code、Kimi 等 runtime 组织成持续团队的 agent-native collaboration OS。[[concept.agent-native-collaboration-os]]

## 最值得学习

1. **先处理 Agent Experience，再做协作表面。** Agent 是 turn-based process，不是一直盯着群聊的人。Inbox、held draft、room version、task owner 比头像和频道更接近真实壁垒。[[source.raft.blog-ax-chaos]]
2. **用自己的生产流程做产品证明。** muted-channel 案例公开了 agent 调研、实现、独立验证、trace、staged rollout 和 human release gate，比 demo 更能说明工作合同。[[source.raft.blog-feature-ships]]
3. **不绑定模型，控制组织状态。** Runtime 可以替换；持续身份、责任、交接、审批和 app identity 才是 Raft 试图占据的层。
4. **早期 GTM 可以从 power user 和 hands-on community 起量。** Slock 先被已有多 Agent 痛点的工程师采用，再用 X、V2EX、Linux.do、GitHub 和线下 workshop 放大，没有依赖 PH/HN 榜单。
5. **从 workspace 向身份层上移。** Login with Raft 和 Connected Apps 如果形成生态，会让 Raft 从协作客户端变成 Agent 的组织身份与授权控制面。[[source.raft.docs-login-with-raft]]

## 不能被叙事遮住的问题

- DAA 统计 Agent 活跃和 handoff，不统计合格交付物、成本与人类干预；页面时间还不自洽。[[source.raft.blog-daa]]
- 社交式协作会产生抢任务、重复提交、上下文和 token 成本。Raft 已设计控制面，但没有独立数据证明收益持续大于成本。[[source.raft.linuxdo-agent-management]]
- 本地 runtime 不等于数据全本地；workspace 消息和任务仍是云数据，Enterprise 合规能力尚未上线。
- Dogfooding 证明产品可用，不证明一般组织愿意采用同样的团队拓扑。

## 对我们有用的判断问题

研究或设计 Agent 协作产品时，不要问“能跑多少 Agent”，而要问：

- 一个工作项由谁认领，如何避免重复？
- Agent 醒来时看到什么，过时草稿怎么处理？
- handoff 是否被下一位 Agent 正确接住？
- 人类在哪些不可逆节点必须 gate？
- 每个 accepted deliverable 消耗多少 token、等待和人工校正？
- 横向团队、层级 orchestrator、独立单 Agent 分别适合哪些任务拓扑？

## 暂时结论

Raft 已经给出一套比“Agent 群聊”更严肃的协作原语，并且能在重度用户和自身研发中运行。它是否成为基础设施，取决于 AX 原语能否形成可量化的生产力优势，以及 app identity / authorization 能否长成生态，而不是产品里有多少 Agent persona。
