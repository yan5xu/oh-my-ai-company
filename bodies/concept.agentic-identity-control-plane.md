Agent 身份控制面不是“给 Agent 建一个账号”，而是把 Agent 的生产访问建模成一条可执行、可撤销、可审计的链：

1. **Principal**：哪个应用、Agent 实例或 sub-agent 在行动；
2. **Delegation**：它代表哪个人或组织，委托如何产生；
3. **Task / Session**：当前任务和会话边界；
4. **Scope**：可以访问哪个资源、执行哪个动作、持续多久；
5. **Policy**：何时允许、拒绝、升级审批或暂停；
6. **Enforcement**：认证、token mint 和 tool call 是否真的经过控制面；
7. **Evidence**：能否归因、撤销、复盘，同时不泄漏秘密。

[[company.newcore]] 把 Agent 建模为与人并列的一等身份，并主张 Agentic SSO、task-scoped token、inventory 与实时 policy；Oasis 更强调 intent-driven session identity；Astrix 强在发现 Agent/NHI/secret 及 identity graph；Arcade 则主张很多 Agent 是应用，应采用“app identity × delegated user”的每动作授权，而不是长期 NHI。[[source.newcore.agentic-governance]] [[source.oasis.agentic-access-management]] [[source.astrix.agent-discovery]] [[source.arcade.agents-as-apps-auth]]

研究时不应先接受任何一家对品类的命名。应检查它具体控制哪一段、目标服务支持多细的 scope、旁路是否可见、sub-agent lineage 是否保留，以及 telemetry 失败时 policy 是否仍然生效。
