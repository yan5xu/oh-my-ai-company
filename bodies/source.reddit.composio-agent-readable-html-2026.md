# Reddit：Agent-readable 注册指令

采集时间：2026-07-29。

URL：
<https://www.reddit.com/r/hermesagent/comments/1uq7fgx/composio_hid_signup_instructions_for_ai_agents_in/>

一位 Hermes 用户报告，Composio 在服务端 HTML 中嵌入面向 Agent、但普通页面不可见
的注册指令。主题将其称为 prompt injection；也有评论认为文本只是说明可用注册路径，
没有指令 Agent 自主注册。

2026-07-29 对一手页面复核确认，首页仍包含 `data-agent-readable` 和
`data-agent-signup-instructions` template。当前文本明确要求注册或输入凭据前先向
用户确认，与 Reddit 引用的更强“无需人类”措辞不同。

该来源支持“存在 Agent 定向 HTML 模式”和“措辞发生变化”，不支持恶意意图或普遍
prompt-injection 影响结论。
