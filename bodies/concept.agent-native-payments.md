# Agent-native 支付层

一种 agent infra thesis：未来 agent 不会像人一样浏览、订阅、结账，而是会逐次调用模型、API、数据和软件服务，并按调用进行授权、预算控制、计费与结算。

AIsa 的证据点：官网 FAQ、官方融资稿、Forbes 和 agent-card 都强调 x402/HTTP 402、stablecoin settlement、pay-per-call、usage-based billing、machine-to-machine payment。

Sapiom、Skyfire、Nevermined 让这个概念出现了不同产品形态：

- [[company.sapiom]] 把 payment 绑到 capability marketplace、execution runtime 与 governance；
- [[company.skyfire]] 更偏 KYA、wallet 与支付 token；
- [[company.nevermined]] 更偏 meter、access、pricing 与 settlement。

这说明 Agent-native payment 不是单一产品类别，而是可能作为协议、结算轨道、commerce control plane 或执行引擎的一层出现。

核心风险：支付层本身可能不是独立入口，它需要绑定高频资源调用场景。若没有资源供给和 agent 需求，支付协议只会是底层能力而不是增长飞轮；x402、Mastercard AP4M 或云平台内置能力也可能把 rail 标准化。

Related: [[company.aisa]], [[person.jordan-liu]], [[source.agent-card.aisa-root-2026-07-08]], [[source.linkedin.jordan-liu-interview]], [[source.sapiom.docs-governance-2026-07-14]], [[source.mastercard.ap4m-sapiom-2026-06-10]], [[note.sapiom-product-takeaway-2026-07-14]].
