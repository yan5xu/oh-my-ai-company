# Composio 认证文档快照

采集时间：2026-07-29。

URL：<https://docs.composio.dev/docs/authentication>

## 文档中的模型

- Auth Config 是可复用的认证蓝图，定义 Toolkit 的认证方式、scope 和凭据。
- Composio Managed Auth 在支持的 Toolkit 上提供 Composio 自己的 provider
  application credentials。
- 当开发者需要自有 OAuth app、自定义 scope、独立 quota、品牌、自定义实例，或
  Toolkit 没有 Managed Auth 时，使用 Custom Auth Config。
- 每个下游 User 完成 provider 授权后，会得到独立的 Connected Account。
- 同一个 User 可以为同一 Toolkit 建立多个 Connected Account，例如工作和个人
  Gmail。
- 文档称 OAuth access token 会自动刷新；需要重新授权时，连接进入 `EXPIRED`
  生命周期状态。

## 边界

这是产品对预期控制模型的说明，不能单独证明每个 Toolkit 都一致实现了该生命周期，
也不能证明所有 provider 侧授权都能从 Composio 完成撤销。
