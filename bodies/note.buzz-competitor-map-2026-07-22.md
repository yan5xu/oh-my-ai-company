# Buzz competitor and boundary map

| 竞品层 | 代表 | 与 Buzz 的重叠 | Buzz 当前差异 |
| --- | --- | --- | --- |
| Team chat | Slack, Microsoft Teams, Discord | channels、threads、DMs、voice、bots | Agent 为 first-class identity；self-hosted Nostr relay；Git/workflow 同域 |
| Code forge | GitHub, GitLab | repos、PR/review、CI/workflows、identity | 讨论、Agent 与 Git event 共用 signed event/history；forge 上层仍早 |
| Agent in existing workspace | Slack agents、Atlassian agents、Centaur | Agent 进入团队上下文并执行任务 | Buzz 试图替代底层 workspace，而非作为插件；迁移成本更高 |
| Agent orchestration cockpit | 多 Agent mission control、IDE/private sessions | 并行 agent、handoff、status、approval | Buzz 强调多人共享 channel、持久身份和组织上下文 |
| Knowledge/project suite | Notion、Linear、JetBrains Space | docs、tasks、project history、code collaboration | Buzz 把 signed agent action 和 open relay 放在中心 |

最接近的竞争轴不是“聊天 UI”，而是 **谁拥有人和 Agent 的长期组织上下文、权限、任务轨迹与协作入口**。

本表只做产品边界识别，不判断市场份额或胜负。TechCrunch 提到 Centaur；HN 用户提到 JetBrains Space、raft.build 等，均需后续单独建档后才能做强比较。
