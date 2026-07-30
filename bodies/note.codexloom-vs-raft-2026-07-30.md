# CodexLoom 与 Raft 的有界产品比较（2026-07-30）

> 截止时间：2026-07-30。CodexLoom 固定公开基线：`218dc4bf5c95b4c514475e471bc1acf3c0e31ab7`。未读取或引用当前 dirty worktree。

## 实体消歧

问题中的 Raft 最合理且可确认的对象是 `raft.build`：问题所述定位与官网 “Where humans and AI agents build together” 逐字对应；官方上海 Meetup 又明确说明 Raft formerly Slock，和 Vault 中既有 `company.raft` 历史连续。没有证据表明这里指 HashiCorp Raft、共识算法或其他同名产品。[[source.raft.homepage-2026-07-30]] [[source.raft.events-shanghai]]

## 一句话区分

**Raft 更像人和多种 AI Agent 共同工作的 agent-native 团队聊天室/工作区；CodexLoom 更像一个高级个人 Owner 用来长期组织、治理并对外连接一支 Codex Domain Agent Team 的控制与协作层。**

两者都反对一次性、匿名、无积累的 task agent，也都强调持久身份、独立上下文、Agent 间协作和 Human 最终决定；但它们选择的产品中心不同。

## 当前公开定位与核心对象

### Raft

Raft 的顶层容器是 server：一个团队共享 channels、DMs、threads、tasks、files、humans、agents 与 computers。Agent 是 server 的完整成员，能在频道中发言、认领任务、交接和审阅。实际执行发生在连接到 server 的 Computer 上；Raft Computer 管理 runtime 进程。[[source.raft.homepage-2026-07-30]] [[source.raft.docs-agent-team]] [[source.raft.docs-tasks]]

Raft 的核心对象是“同一个共享工作房间中的人类成员与 Agent 成员”。它直接拥有聊天与任务面，强调 chat is the workspace。runtime 是可替换的执行引擎，当前可混用 Codex CLI、Claude Code、Kimi CLI、Gemini CLI、OpenCode 等。[[source.raft.docs-runtime-2026-07-30]]

### CodexLoom

CodexLoom 的核心对象是“由一个 Owner 长期维护、每个成员持续负责一个 Domain 的 Codex Agent 组织”。一个 Agent 绑定稳定 ID、Profile 和主要 Codex Thread；Codex 继续拥有 Runtime 与 Thread 历史，CodexLoom 管稳定责任、组织关系、通信、外部边界和治理。[[source.codexloom.github-main-218dc4b]] [[source.codexloom.owner-guide-218dc4b]]

CodexLoom 不把自己的 WebUI 变成所有人的新群聊，也不把 Task/Workflow 作为主要治理对象。外部协作者仍可留在飞书、Slack、Parall，由有明确 Membership 的 Interface Agent 承接请求、路由到 Domain Agent，再把结果送回原 Conversation。[[source.codexloom.conversation-membership-218dc4b]]

## 真正重叠的部分

1. 都给 Agent 稳定身份，而不是每次任务生成匿名实例。
2. 都希望 Agent 的历史、专长和工作方式随时间积累。
3. 都允许多个 Agent 之间沟通、分工、交接并接受人类复核。
4. 都能让 Codex 成为底层 runtime；都不把模型推理本身作为唯一产品价值。
5. 都在构建“Agent team layer”，不是单个 prompt 或单一 coding task 的包装。

这些重叠足以让二者成为可比较产品，但不足以说它们是同一品类中的完全替代品。

## 已确认差异矩阵

| 维度 | Raft | CodexLoom |
|---|---|---|
| 产品层级 | Agent-native shared workspace；聊天、任务和团队成员都在 Raft server 内 | Codex 之上的长期 Agent 组织与治理层；不重新实现 runtime，不以项目管理为核心 |
| 运行位置 | managed agent 由本地/云 VM 的 Raft Computer 启动；external agent 可自行运行后接入 | 本地自托管 CodexLoom 连接共享 Codex app-server；每个 Agent 以主要 Codex Thread 为持续载体 |
| Runtime | 多 runtime：Codex、Claude Code、Kimi、Gemini、OpenCode 等，可混用和切换 | 固定基线是 Codex-native；没有公开证据支持其他 runtime |
| 长期身份与记忆 | Agent identity + 本机 workspace/memory；切换 runtime 后保留这些资产；共享频道提供团队上下文 | 稳定 ID/name/Profile + 主要 Codex Thread；连续性来自 Thread 历史、prompt cache、compaction 与持久 Profile；不是独立的统一 memory engine |
| 协作原语 | Channels、DMs、threads、mentions、files、tasks、task owner/status/board、reminders、joint channels | Messages、Topics、Needs You、Artifacts、Organization、Collaboration、Activity、Goals、Schedules、Triggers；Task/Workflow 不作为核心治理对象 |
| Human 治理 | 人设方向、看线程、审阅结果并作最终决定；任务在 human approval 后 done；owner/admin 控制 runtime 和 apps | Owner 定目标、边界、长期 Profile/关系与重大授权；Needs You 承接人的事实/选择/授权；声明关系不自动授予凭据、生产或外发权限 |
| 外部会话 | 主要把人和 Agent 带入 Raft server；external agents 和 joint channels 扩大房间；Connected Apps 是身份/应用层 | 把受治理 Agent 带入现有飞书、Slack、Parall Conversation；Membership 逐会话定义角色、触发与出站策略 |
| 数据与部署 | Agent 本地工作区留在 Computer；发到 Raft 的消息、附件、任务、元数据进入 Botiverse 云端，美国服务器；私有部署仍 coming soon | 产品本地优先、自托管；registry/Profile/关系/通信 ledger 等保存在本地数据目录，Codex rollout/Thread 仍由 Codex 层承载；不同账号或信任域需独立实例/CODEX_HOME |
| 目标用户 | 需要多人、多 Agent、多机器或多模型在一个共享项目房间协作的 builder/team | 想长期经营多个专业 Domain Agent、减少上下文搬运，并以受治理方式服务业务和外部协作者的高级个人 Owner |

## 各自更适合的情形

**Raft 更适合：** 团队希望把人类、Codex、Claude Code 等不同 runtime 放进一个共享项目房间，用频道和任务板进行可见的认领、并行、交接与审阅；或者需要多人把各自 Agent 带进同一协作空间。

**CodexLoom 更适合：** 一个高级个人已经在 Codex 中形成多个长期工作领域，希望每个 Agent 长期拥有明确责任和独立 Thread，并需要组织关系、跨域路由、Human 授权、持续调度，以及把成熟能力带进飞书/Slack/Parall，而不要求外部协作者迁移到新工作区。

这不是优劣判断。真实选择还取决于团队人数、runtime 异构程度、是否接受云端协作数据、是否需要既有 IM 接入，以及工作以“共享项目任务”还是“长期 Domain 责任”为中心。

## 证据不能支持的说法与未知

- 不能说 Raft 或 CodexLoom 在效率、质量、token 成本、留存、安全性上优于对方；没有可比的独立基准。
- Raft 官网 Logo、testimonial、DAA 或“10x”是厂商托管口径，不等于独立采用或 ROI。
- 两边都使用“identity”“memory”“team”等词，但实现和统计口径不同，不能直接等值比较。
- Raft 的 Enterprise 私有部署、SSO、高级访问控制尚未上线；不能按现成能力比较。
- CodexLoom 是 ELv2 source-available，不应称为 OSI 开源；本轮没有确认 Raft 的完整产品源码许可状态，也不做“谁更开源”的结论。
- 没有一手来源证明二者可直接互操作、迁移 Agent identity/memory 或同时作为同一 Agent 的官方双控制面。
- Conversation Membership 是行为上下文，不是安全沙箱；Raft 的本地执行也不等于全部协作数据留在本地。

## 可公开的简短回答

> Raft 和 CodexLoom 都在做长期 Agent Team，但产品中心不一样。Raft 是一个让人和多种 AI Agent 在同一 server 里用频道、线程和任务共同工作的 agent-native workspace；Agent 可以跑在不同电脑上，也可以混用 Codex、Claude Code、Kimi、Gemini 等 runtime。CodexLoom 则是 Codex-native 的长期 Agent 组织与治理层：一个 Agent 持续拥有一个 Domain、Profile 和主要 Codex Thread，多个 Agent 通过 Message/Topic/关系协作，Owner 在关键事实、决定和授权处介入，并可把 Agent 以受治理身份接入飞书、Slack、Parall。简单说，Raft 更偏“把整个团队搬进一个 Agent-native 工作房间”，CodexLoom 更偏“一个 Owner 长期经营一支 Codex Domain Agent 组织，并让它进入已有工作环境”。两者有重叠，但不是完全替代关系。

### 关键一手来源

- Raft 官网：https://raft.build/
- Raft Runtime：https://docs.raft.build/features/agents/runtime/
- Raft Tasks：https://docs.raft.build/features/collaboration/tasks/
- Raft External Agents：https://docs.raft.build/features/agents/external/
- Raft Privacy：https://raft.build/privacy/
- CodexLoom 官网：https://codexloom.ai/zh-cn/
- CodexLoom 固定公开提交：https://github.com/yan5xu/codexloom/tree/218dc4bf5c95b4c514475e471bc1acf3c0e31ab7
- CodexLoom Owner Guide：https://github.com/yan5xu/codexloom/blob/218dc4bf5c95b4c514475e471bc1acf3c0e31ab7/docs/owner-guide.zh-CN.md
- CodexLoom Topics：https://github.com/yan5xu/codexloom/blob/218dc4bf5c95b4c514475e471bc1acf3c0e31ab7/docs/topics.md
- CodexLoom Conversation Membership：https://github.com/yan5xu/codexloom/blob/218dc4bf5c95b4c514475e471bc1acf3c0e31ab7/docs/conversation-membership.md
