# Sapiom 竞品边界与市场地图

## 分类原则

是否直接竞争，不看“都服务 Agent”，而看它是否争夺同一个控制点、预算和买方。

### 直接竞争：Agent commerce / payment control plane

- [[company.skyfire]]：KYA identity、wallet、pay token、buyer/seller payment。与 Sapiom 在身份、Agent 账户和支付授权层直接重叠。
- [[company.nevermined]]：meter、access、pricing、settlement，支持 fiat/crypto、x402、MCP、A2A。与 Sapiom 在能力计量、访问与结算层直接重叠。

### 协议与支付轨道

Coinbase x402、Mastercard AP4M 是 rail/protocol。它们可能让机器支付标准化并压低独立网关的差异，但本身不等于 Sapiom 的完整 authoring/runtime/capability marketplace。

### 新增的 runtime 竞争面

Temporal、Trigger.dev、Inngest、Restate、LangGraph、OpenAI Agents SDK 等争夺工作流编排与运行时。它们通常不把付费能力市场作为核心，但 Sapiom 向 Create/Run 上移后，开发者预算和集成入口开始重叠。

### 供应商与相邻噪声

OpenRouter、Blaxel、Upstash、Firecrawl、搜索/浏览器供应商是 Sapiom 聚合的供给，不应因为 Similarweb、文档或共同关键词就标成竞品。

## 判断

Sapiom 的差异化不是单项能力更深，而是把 access、execution、payment、governance 合成一条短链。其防御性取决于：统一接入是否显著降低开发成本、治理是否足以让企业信任、能力供给是否有价格/可靠性优势，以及 runtime 是否形成迁移成本。

证据：[[source.skyfire.official-product-2026-07-14]]、[[source.nevermined.official-product-2026-07-14]]、[[source.coinbase.x402-how-it-works-2026-07-14]]、[[source.mastercard.ap4m-sapiom-2026-06-10]]。
