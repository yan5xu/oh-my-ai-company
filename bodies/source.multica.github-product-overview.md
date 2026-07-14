# Multica 产品与代码结构概览
# Multica 产品与代码结构概览

**证据等级：S1，官方 README、docs 与代码。**

核心链路：用户把 Issue 分配给 Agent，本地 daemon 认领任务，为任务创建独立工作目录/git worktree，驱动已安装的编码 CLI，并把进度和结果写回 server。相同 `(agent, issue)` 会恢复既有 session 与 workdir。

可配置内容包括 provider/runtime、instructions、环境变量、启动参数、MCP、最大并发数、Skills 与 visibility。Squad 由 leader 路由给 members；Autopilot 可由 cron、webhook 或手工触发创建 Issue。

安全边界：本地执行不等于低权限；部分 provider 使用高权限模式，macOS Codex 还存在 `danger-full-access` fallback。关联：[[company.multica]]、[[concept.issue-native-agent-management]]。
