我对 [[company.newcore]] 最重要的 takeaway 是：**Agent 身份不是账号字段，而是生产访问的控制链。**

1. 真正需要绑定的是 app、Agent instance、sub-agent、delegated user、task/session、resource/action，而不是只选“人类或非人类”二分法。
2. task-scoped token 的上限受目标服务权限模型约束。平台能缩短、收窄和审计 token，但不能凭空创造目标 API 不支持的 scope。
3. “inline on every request”比 inventory 更难，也更有价值。它要求认证、token mint、工具调用与 runtime telemetry 真的经过同一 policy enforcement path。
4. NewCore 和 Arcade 的分歧很有启发：前者强调一等 Agent 身份，后者强调 Agent 是应用、采用 app × delegated user。生产系统可能同时需要两种视角。
5. 6600 万美元和强 founder network 能迅速打开 enterprise 门，但当前没有命名客户、docs、API、使用量或独立产品反馈，不能把资本 access 写成 PMF。

对我们研究 AI 员工的直接意义是：workspace/control plane 解决“谁负责什么”，identity control plane 解决“它凭什么进入生产系统、代表谁、能做多大、如何撤销”。两层会逐渐合流，但不应混为同一个产品类别。[[concept.agentic-identity-control-plane]]
