# AGI Playground 2026 A 组现场公司快速简报

**cutoff**：2026-08-03；第一消费者：CP 现场交流。

## 使用边界

- 活动方公开页确认日期、地点和活动形态；Day 1 人物来自 Founder Park 议程原图。[[source.event.agi-playground-2026-luma]] [[source.event.agi-playground-2026-agenda]]
- “现场人物”表示被公开议程点名，不等于已经签到；Luma 当前官方议程已确认 Eileen Weng / Ateve，纠正了先前转引版议程遗漏。
- 公司经营数字若来自公司公告，统一标为公司自报；合作伙伴、同场边会不等于客户、合作或投资关系。
- 以下“与 Parall 的关系”只是产品邻近度分类，不是合作建议或战略判断。

## 现场优先速览

| 对象 | 现场人物 | 与 Parall 的关系 | 现场最值得确认 |
| --- | --- | --- | --- |
| Genspark | Eric Jing，CEO | 直接竞品：通用 AI workspace / agent execution | Business 客户实际部署单位；agent 的长期身份、权限与协作治理 |
| Simular | Ang Li，Co-Founder & CEO | 直接竞品/运行时相邻：computer-use desktop agent | 学习成功 workflow 的存储与权限边界；多人、多 agent 与审计/回滚状态 |
| WIZ.AI | Jianfeng Lu，Co-Founder & CEO | 相邻产品 / GTM：企业语音 agent | 100M+ 月调用中 production 与人工转接口径；企业权限、录音和跨国数据边界 |
| Ateve | Eileen Weng，Founder & CEO | 相邻基础设施：面向 agent 的 Web Search API | 法律实体及与 Bocha 的关系；已上线客户、定价、ZDR/SOC 2/SLA 的可核验边界 |
| eclicktech / zMaticoo | Bill Cao，zMaticoo VP | GTM 潜在触点：广告投放与 app 变现 | AI agent 是客户产品还是内部提效；ADX 的 API、归因、品牌安全和人工审批 |
| Airwallex | Kai Wu，Chief Revenue Officer | 支付/金融基础设施潜在触点 | Airi/T:0 在 APAC 的真实 beta 状态；agent payment 的授权、限额、撤销和审计 API |
| MiniMax | 议程仍标“待定” | 模型供应与生态潜在触点 | 先确认代表身份；企业 API 的主要 agent use case、区域服务和数据边界 |
| ACE Studio | Joe Guo，CEO | 相邻垂直产品：AI 音乐/创作工具 | 训练数据与生成内容权利；专业创作者、教育和 API/平台客户的真实占比 |
| Notta / SpeakON | Ryan Zhang，Founder & CEO | 相邻产品/接口：会议记忆与语音输入 | SpeakON 与 Notta 的账户、数据和记忆是否打通；本地/云处理、API 与设备路线 |

## 1. Genspark

**实体与官网**：Genspark Inc.，`genspark.ai`。不是同名搜索产品或咨询公司。

**产品/客户**：从 Super Agent 演进为一站式 AI Workspace，覆盖文档、会议、网站、PPT、表格、研究、电话和 terminal/clipboard 等执行入口。公司面向个人与 Genspark for Business；公开客户数只有公司自报，没有命名客户或留存口径。[[source.genspark.field-brief-2026-08-03]]

**融资/规模**：Reuters 确认 2026-06 Series B extension 1 亿美元、估值 26 亿美元；公司自报累计融资 6.45 亿美元、6,400+ business clients、2.5 亿美元以上 ARR。ARR、客户定义与留存未被独立审计。

**现场问题**：
1. 6,400+ business clients 中，多少是付费组织、试用注册或渠道账户？典型部署是个人席位、团队 workspace 还是企业 tenant？
2. Genspark Claw/Terminal 执行外部动作时，是否有长期 agent identity、最小权限、审批、审计与跨 agent 隔离？

## 2. Simular

**实体与官网**：Simular Inc.，`simular.ai`；不是同名 simulation 软件。

**产品/客户**：native desktop agent 控制 macOS/Windows 软件，跨应用完成长流程，人在环纠正后可学习并重复成功 workflow；开源 Agent S 是其 computer-use research/runtime 线。官方只披露“数百万执行 steps”和保险、招聘、旅行等场景，没有客户数、付费规模或任务成功率。[[source.simular.field-brief-2026-08-03]]

**融资/规模**：2025-12 官方宣布 2,150 万美元 Series A；此前 seed 500 万美元。官方 benchmark 69.9% OSWorld 接近其引用的人类 72%，但 benchmark 不等于真实生产可靠性。

**现场问题**：
1. 用户纠正后形成的可复用 workflow 存在本机还是云端，是否可查看、版本化、撤销与分享？
2. 当前产品如何处理高风险动作、凭证、失败恢复和多人共同监督；哪些能力仍只在 Agent S research 中？

## 3. WIZ.AI

**实体与官网**：WIZ.AI，`wiz.ai`；需要与云安全公司 `wiz.io` 分开。

**产品/客户**：企业 Voice AI Agents，覆盖客服、外呼、质检、多语言运营，重点行业为银行金融、电信、医疗和电商。公司自报 300+ enterprise clients、17 国、每月 1 亿次以上 AI calls。[[source.wiz-ai.field-brief-2026-08-03]]

**融资/规模**：官方只说 2025 Series B 为“tens of millions”，并自报 2024-2025 收入增长超过 100%；精确融资额、收入额、客户留存未知。

**现场问题**：
1. 100M+ 月 calls 的口径是呼叫尝试、接通、完整对话还是成功任务？人工接管率与任务完成率如何定义？
2. 银行/电信客户的 tenant、语音数据、跨境传输、模型训练复用和操作审计如何隔离？

## 4. Ateve

**实体与官网**：目标对象已确认是 `ateve.ai` 的 Ateve / ATEVE，不是法国同名工程公司或 Steve AI。Luma 官方 Day 1 议程明确列出 **Eileen Weng，Founder & CEO，Ateve**；她的公开档案也写明 `Founder & CEO of ATEVE | Co-founder of Bocha`。[[source.event.agi-playground-2026-luma]] [[source.ateve.field-brief-2026-08-03]]

**产品/客户**：Ateve 是面向 AI agents 的 Web Search API，提供 Search/Extract、Python/Node.js/Java SDK、MCP、CLI/Skills 和 OpenAI tool-calling。官网把自身描述为 real-time search、live entity data 与 original-source verification 的 retrieval layer。公开页面没有客户名称、请求量或收入；定价仍显示占位符。

**规模/可信事实**：LinkedIn 公司页标注 San Francisco、11-50 人，但这是公司自报。官网声称 ZDR、SOC 2 Type II、99.99% SLA 及 benchmark 领先；当前 Trust Center/Security 链接禁用、Privacy/Terms 为 404，未取得报告或条款，不能独立验证。融资、收入、客户数和市场份额未知。

**法律/品牌关系**：Eileen Weng 同时是 Bocha 联合创始人，Bocha 官方也提供面向 AI 的 Search/Reranker API，说明人物和产品类别连续。但没有 Ateve/Bocha 官方材料说明 Ateve 是 Bocha 海外品牌、子公司、spinout 或独立新公司，也没有 Ateve 法律公司全称。两者不得合并，Bocha 的融资、客户和规模不得继承给 Ateve。

**与 Parall 的关系**：相邻基础设施/潜在工具供应，提供 agent 所需的 Web search 与 retrieval，不是已确认的完整 agent runtime 或团队协作竞品。

**现场问题**：
1. Ateve 的法律实体是什么，与 Bocha 的关系是独立公司、海外品牌、子公司还是 spinout？技术索引、团队和客户是否共享？
2. 当前已付费客户、真实价格和请求规模是什么；ZDR、SOC 2、99.99% SLA 与 benchmark 能否提供公开方法、报告或合同边界？

## 5. eclicktech / zMaticoo

**实体与官网**：易点天下网络科技股份有限公司 / eclicktech，`eclicktech.com.cn`，深交所 301171；zMaticoo，`zmaticoo.com`，是集团 programmatic advertising 平台，不是独立融资公司。[[source.eclicktech-zmaticoo.field-brief-2026-08-03]]

**产品/客户**：集团为电商、游戏、工具应用、新能源车等企业提供出海数字营销；zMaticoo 连接广告主和 app inventory，通过 ADX、实时竞价及 AI/ML 做投放和变现。

**规模**：2025 年公司整体营业收入 38.30 亿元，同比增长 50.39%；不能归因给 zMaticoo。广告主数、zMaticoo 净收入、留存和 AI 节省比例未披露。

**现场问题**：
1. 新加坡展示的 Qwen/AI agent 是对客户开放的产品、内部运营 copilot，还是服务交付包装？哪些动作可以由 agent 直接执行？
2. zMaticoo 的 agent/API 如何处理预算上限、品牌安全、归因冲突、素材审批和误投回滚？

## 6. Airwallex

**实体与官网**：Airwallex，`airwallex.com`，全球支付与金融平台。

**产品/客户**：多币种账户、FX/transfer、卡、费用管理、收单、账单、平台 API 和 embedded finance；服务对象从创业公司到大型企业及平台客户。[[source.airwallex.field-brief-2026-08-03]]

**融资/规模**：2026-06 Series H 3.2 亿美元、估值 110 亿美元、累计融资 18 亿美元。公司自报 2026-03 年化收入 13 亿美元、年化交易量 2,870 亿美元、676,000+ businesses、85+ licenses、2,300+ 员工。

**现场问题**：
1. T:0 private beta 与 Airi 的 delegated agent payments 在新加坡/APAC 已开放到什么阶段，谁是当前设计伙伴？
2. 当 agent 支付出错时，权限委托、额度、审批、撤销、争议处理和审计记录分别由 Airwallex 还是上层 agent 平台负责？

## 7. MiniMax

**实体与官网**：MiniMax Group Inc.，`minimax.io` / `ir.minimax.io`，港交所 00100；不是同名算法或游戏公司。

**产品/客户**：多模态基础模型、API 与消费者应用。公开材料支持其为模型/应用公司，但企业客户构成、API 生产负载和区域数据路径仍不透明。[[source.minimax.field-brief-2026-08-03]]

**融资/规模**：2025 年审计收入约 7,903.8 万美元。2026-07 约 20.5 亿美元是股份配售与可转债融资计划，不是“已完成 20 亿美元私募”。2026 年媒体转述的用户和年化收入增长主要来自公司口径，现场不宜当独立事实。

**现场问题**：
1. 先确认 MiniMax 实际代表、职务和负责产品；公开议程尚未给名字。
2. 企业 API 增长主要来自 coding/agent、语音、视频还是消费者应用？新加坡客户的数据驻留、模型版本和服务 SLA 如何处理？

## 8. ACE Studio

**实体与官网**：ACE Studio / Timedomain，`acestudio.ai`；公开产品更新以 Timedomain 名义发布，需要现场确认法律实体和品牌关系。

**产品/客户**：AI-native music workstation，面向音乐创作者和音乐教育，通过 MIDI、歌词、文本生成或编辑写实歌声与乐器；基础设施案例确认其有全球用户，但没有公开用户数或客户结构。[[source.ace-studio.field-brief-2026-08-03]]

**融资/规模**：外部口径在“近 2,000 万美元”与“未融资”之间冲突，缺少官方公告，保留未知。基础设施案例证明真实训练/推理工作负载，不证明收入或市场份额。

**现场问题**：
1. 训练语音/乐器数据的授权方式、生成物商业权利、声音克隆同意和下架机制是什么？
2. 当前收入主要来自专业订阅、教育、企业授权还是 API；是否开放给外部 agent 以结构化方式调用？

## 9. Notta / SpeakON

**实体与官网**：Notta Inc.，`notta.ai`；SpeakON，`speakon.app`，条款明确为 Notta Inc. 产品，不是独立公司。[[source.notta-speakon.field-brief-2026-08-03]]

**产品/客户**：Notta 做会议转写、摘要和 action items；SpeakON 是 MagSafe 语音设备与 AI voice keyboard，把口述转成可发送文本。面向个人、团队与需要 voice intelligence 的企业。

**融资/规模**：2025-12 Series B 1,500 万美元；公司当时自报 5,000+ companies、1,500 万 users。TechCrunch 单次实测指出 SpeakON 的平台限制，但不能外推为整体口碑。

**现场问题**：
1. SpeakON 和 Notta 是否共享账户、联系人语境、团队知识与长期记忆；用户能否选择本地处理、区域存储和训练退出？
2. SpeakON 的硬件、iOS keyboard 和 Notta meeting bot 如何分工；是否有 API/SDK 供 agent 获取经授权的语音输入和结构化记录？

## 不能支持的说法

1. 议程列名等于本人已经到场或愿意交流。
2. 活动伙伴等于客户、合作方或投资关系。
3. 公司自报 ARR、客户数、calls、users 等于独立审计结果。
4. Genspark/Simular 与 Parall 在同一层完整竞争；当前只确认部分 workspace、computer-use 和 agent execution 重叠。
5. Airwallex 的 Airi/T:0 已全面开放；公告明确存在 beta 和未来计划。
6. MiniMax 已完成 20 亿美元私募；法定口径是融资计划。
7. Ateve 与 Bocha 是同一法律实体或可共享融资、客户和规模；当前只确认人物与产品类别连续。

## 更新触发器

- CP 现场确认 Ateve 法律实体、与 Bocha 的正式关系或取得可核验 Trust/SLA/客户材料；
- MiniMax speaker 从“待定”变成实名；
- 现场演示或公司代表给出可公开验证的新产品/客户口径；
- 活动方更新 agenda、字幕或 photo feed，能确认人物实际出席；
- 任何现场说法与现有融资、产品阶段或权限边界冲突。
