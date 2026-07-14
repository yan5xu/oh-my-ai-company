# Coinbase x402 protocol: how it works

Coinbase x402 文档描述基于 HTTP 402 的机器支付流程：服务返回 payment requirements，客户端签署 payment payload，服务端验证/结算后提供资源。

x402 是协议/rail，而不是完整 Agent runtime。它可能降低 machine payment 的协议摩擦，同时压缩仅靠支付握手的独立产品差异；Sapiom、Fewsats、Nevermined 等需要在治理、供给、运行时或开发体验上形成额外价值。

证据边界：S1 官方协议文档；不用于评价具体实现的市场份额。
