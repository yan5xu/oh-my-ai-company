作者：Alex Salazar；发布：2025-10-12；Arcade 官方观点，正文完整。

文章反对把多数 Agent 直接建模为长期非人身份，主张“agents are applications”：Agent app 有自己的 client identity，用户通过 delegated OAuth 授权；每次 tool call 在模型决定动作后再做 JIT policy，权限是 app scope 与用户权限的交集。

这是对 [[company.newcore]] “first-class agent identity” 的重要架构反证，但也是竞品自身立场。两种模型可在 app、agent instance、user delegation、task/session 不同层同时成立。[[concept.agentic-identity-control-plane]]
