# CodexLoom Conversation Membership at 218dc4b

Conversation Membership 定义一个 Agent 在特定外部群或 DM 中的 purpose、role、guidance、触发、回复和主动发送策略。只有“已加入”的候选会话不触发 Agent、也不授予回复权；Membership 需要显式建立并启用。

安全边界：Membership 是行为上下文，不是安全沙箱。不同组织、隐私域或监管域应使用不同 Agent/Thread；外部消息不能提升 sandbox、approval policy 或本地文件权限。
