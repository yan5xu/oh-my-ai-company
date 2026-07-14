# Relevance AI 安全与数据边界文档

官方披露 SOC 2 Type II、GDPR；客户数据不用于训练，可导出和删除，删除在 60 天内完成。传输 TLS 1.2+、静态 AES-256。

组织创建时选择 Sydney、North Virginia 或 London 区域。默认多租户逻辑隔离；Enterprise 可用独立 service/database 与 FGA。文档同时写 single-tenant options still in the works。

Enterprise 支持 SSO、MFA、RBAC、FGA 和 prompt injection detection。边界：检测不等于自动阻断；工具的输入输出不由 Relevance 自身记录，但外部 vendor 仍可能处理各步骤数据。
