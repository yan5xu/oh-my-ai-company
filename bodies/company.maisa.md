> **一句话**：Maisa 是面向受监管企业的 Agentic Process Automation 平台，让业务人员用自然语言创建数字员工，由 KPU 把动态规划转换为可验证代码执行，并通过 Chain of Work、权限与生命周期控制面治理结果。

![Maisa 官网首屏：Hallucination-Resistant Digital Workers](assets/maisa/hero.png)

## TL;DR

- **它不是 Slack 里的职位型 AI employee，也不只是低代码 workflow builder。** Maisa 先让业务人员描述目标、约束、政策与验收条件，再由 KPU 为每个 case 动态形成执行步骤、调用 API 或浏览器、运行代码并逐步验证。产品更接近“受监管流程的 Agentic Process Automation”。
- **真正差异是 [[concept.agent-first-workflow|Agent-first 工作流]] 与 [[concept.agent-execution-receipt|Agent 执行收据]] 的组合。** 前者不要求设计时画完整流程图，后者用 Chain of Work 留下任务、来源、工具、校验、异常和结果，试图把灵活 Agent 变成可审计生产系统。
- **但“deterministic”需要严格拆层。** 代码执行和显式校验可以更可复现，不等于 LLM 生成计划、处理新异常和自我修复的整个系统天然确定。官网的“hallucination-resistant”“same input, same output”“no false positives”均是厂商强主张，本轮没有找到独立端到端 benchmark。
- **采用证据从 2025 年的“客户很少”走到了具名 Santander 合作，但仍不透明。** TechCrunch 在 2025-08 写客户基数仍很小；2026 年官网展示 Santander、Elecnor、Job&Talent、Clikalia、QIMA 等 logo，并发布与 Santander AI 负责人的联合演讲。除 Santander 的具名高管发言外，本轮没有找到这些客户自己的实施页面、任务量、续约或结果审计。
- **经营信号强于普通早期 enterprise Agent，但口径冲突明显。** [[person.david-villalon|David Villalón]] 在 2025-03 自报 Maisa Studio 已有“a few millions ARR”；2026-02 的 PR 又称同比增长 400%、客户数 5 倍、员工数 5 倍，却拒绝披露收入、客户数和 Digital Worker 数。官网“thousands of companies”与 TechCrunch 的“very small”不能直接拼成增长漏斗。
- **商业包装很清楚，真实计量仍不清楚。** 官网强调“像员工而不是 API 调用”及可预测价格，成本文章则要求跟踪 workflow/case、step、token、重试、fallback 和延迟；但没有公开价格、合同、credits、硬预算、账单样本或 cost per accepted outcome。
- **资本与团队足以支撑重交付 enterprise GTM。** 公司累计公开融资 $30M：2024-12 的 $5M pre-seed 由 NFX 领投，2025-08 的 $25M seed 由 Creandum 领投，Forgepoint Capital International 参与。LinkedIn 当前公司范围 51-200、people 搜索总数 93；这只是平台自报关联人数，不是审计后的 headcount。
- **公开分发没有形成开发者社区飞轮。** HN 两次 KPU 发布分别 3/2 points、零评论；Reddit 精确域名结果只有一条有效讨论且集中在 benchmark 争论；没有确认 Product Hunt launch。Maisa 更像 founder-led sales、投资人背书、行业活动和客户共创驱动，而不是社区或 self-serve 驱动。

## 产品：把复杂知识流程交给可问责的数字员工

![Maisa 的数字员工视觉：上传资料、定义任务、生成结果](assets/maisa/product-visual.png)

Maisa 针对的是文件多、异常多、需要判断且受合规约束的流程，例如贸易融资、授权书核验、新客户开户、汽车贷款、保险理赔和供应商文档。它的目标买方不是个人用户或开发者，而是大型企业的业务负责人、AI/数据团队、运营转型团队以及安全合规方。

产品把每个 Digital Worker 包装为一个边界明确的“专门员工”：一个岗位、一个职责范围、可衡量结果。业务团队给它目标、规则、验收标准、内部知识和系统访问权，它再对每个 case 形成不同执行路径。这种包装降低了“从哪条流程开始”的决策成本，也把价值口径从 token 和调用次数推向业务流程结果。

![Maisa 对外表达的三件事：BPO 式岗位、KPU、员工式定价](assets/maisa/strategy.png)

### 从自然语言到运行时执行

根据官方产品页，一个任务大致经过五步：

1. **定义合同**：业务人员描述目标、约束、政策、输入、工具和 acceptance criteria；
2. **感知输入**：读取文档、邮件、表单、数据库、应用界面或人工提交的信息；
3. **动态规划**：LLM 与 KPU 根据当前 case 生成可执行步骤，而不是复用一张固定流程图；
4. **执行与观察**：调用 API、浏览器、遗留系统或生成代码，读取结果并决定下一步；
5. **验证与交付**：按业务规则检查输出，成功则交付，异常则重试、调整或交给人。

这与传统 RPA 的核心差异不在“用了 LLM”，而在流程形成时机。RPA/n8n 类工具通常在设计时定义节点和路径；Maisa 把 intent、constraints 和 acceptance criteria 固定下来，把具体路径延迟到运行时。这正是已有 [[concept.agent-first-workflow|Agent-first 工作流]] 在企业流程自动化里的一个实现。

![David Villalón 展示用自然语言 onboard 一个 Spotify Playlist worker](assets/maisa/studio-demo.jpg)

公开演示显示 Maisa Studio 用一个目标名称和自然语言描述开始 onboarding。David 的公开视频还展示过 Spotify playlist、视频生成等通用任务，但团队明确把 regulated enterprise process 作为商业主线。演示能证明产品界面和机制方向，不能证明复杂银行流程的成功率。

## KPU 与 Chain of Work：最强主张，也是最大验证缺口

Maisa 把 KPU 描述为 LLM 与执行环境之间的可靠性层：LLM 负责理解和规划，KPU 将工作转换成代码与工具调用，执行后观察结果、做规则校验，再决定下一步。官方还强调模型无关，可在更强模型上定义流程，再切到更小、更便宜的模型执行。

Chain of Work 则记录一次运行中：

- 收到的任务和输入；
- 使用的来源、知识与工具；
- 生成并执行的步骤；
- 每一步输出和校验；
- pass/fail、异常、人工反馈与最终结果。

![Maisa 对 Chain of Work 的官方视觉表达](assets/maisa/chain-of-work.webp)

这个设计比只保存最终回答更接近监管、复盘和责任追踪需要，因此沉淀为 [[concept.agent-execution-receipt|Agent 执行收据]]。但以下概念不能混在一起：

| 概念 | 公开证据能支持什么 | 不能据此推出什么 |
|---|---|---|
| code-based execution | 已生成的代码可重复运行和检查 | 计划生成本身无随机性 |
| validation | 可按明确规则拦截部分错误 | 所有业务错误都可被预先定义 |
| Chain of Work | 过程有日志和证据 | 日志完整性已经第三方审计 |
| self-healing | 产品会根据异常调整路径 | 调整永不引入新错误或权限越界 |
| feedback/learning | 人可以给自然语言反馈 | 每次执行都自动、稳定地提升质量 |
| hallucination-resistant | 架构试图降低幻觉进入生产结果 | 端到端“零幻觉”已被独立证明 |

官网甚至同时出现“no false positives”和某客户“过滤 99% false positives”。后者意味着仍有剩余误报，前者是绝对营销语言。报告采用较弱、可防守的表述：**Maisa 用代码、规则校验和执行轨迹降低不可解释输出进入生产流程的概率。**

## 控制面：从创建一个 worker 到管理数字劳动力

Maisa Studio 不只提供 builder，还覆盖 onboard、test、deploy、monitor 四个生命周期阶段：

- **Onboard**：配置访问、上下文、业务规则与 acceptance criteria；
- **Test**：在受控 case 中验证行为与性能；
- **Deploy**：托管订阅、客户私有云或 on-prem；
- **Monitor**：查看准确率、速度、吞吐、消耗、ROI 和执行结果。

管理页还声明可以给 worker 分配角色、职责和 access level，限制其可读取与修改的数据，并用集中式 control tower 管理 rules、permissions 和 guardrails。每个 worker 可自动暴露 API，也可嵌入客户自己的 UI。

这使 Maisa 与 [[company.relevance-ai|Relevance AI]]、[[company.ema|Ema]] 在企业 Agent 生命周期层直接重叠。区别是 Maisa 把“动态流程 + 可审计执行”放在中心，Relevance AI 的公开 eval/trace/发布闸门更具体，Ema 的 enterprise context 与大型客户案例更完整。

### 权限、审批与失败升级

公开材料能确认：业务人员可以 review、反馈、测试，复杂 exception 可转给 specialist；每个 worker 有数据访问边界；Studio 有 lifecycle monitor。HALP（Human-Augmented LLM Processing）把人放在 exception 和反馈环节，而不是每一步都手工批准。

但本轮没有验证：

- action-level policy 是逐次批准还是 standing authorization；
- 高风险副作用如何分级；
- 失败重试上限、幂等、补偿事务和 rollback；
- 人工接管后如何恢复 worker 状态；
- audit log 的保留、导出、防篡改和角色访问；
- self-healing 变更是否进入版本、回归测试和重新审批。

因此 Maisa 可以写成“有治理导向的数字员工控制面”，不能写成已经证明成熟的企业 Agent 治理系统。

## 成本与商业模式：卖岗位，但底层仍要计量执行

官网把商业模式概括为“Predictable pricing, like employees, not API calls”，强调没有不可预测 token 支出、容易计算 ROI。成本文章又给出一套更细的工程计量：cost per workflow/case、tokens per step、tool latency、retry/fallback rate、end-to-end time、queue depth 和 concurrency。

这揭示了一个重要事实：**前台可以按员工或流程售卖，后台仍必须按执行资源精细计量。** Maisa 通过模型路由、减少 LLM 循环、代码执行、弹性基础设施和 step-level observability 来压成本，但没有公开：

- 套餐、席位、worker 或 case 单价；
- included volume、超额计费和第三方工具成本；
- hard budget、停机阈值或异常重试的退款规则；
- 客户真实账单和 cost per accepted outcome；
- ARR 是否包含实施、服务或一次性费用。

David 在 2025-03 的公开回复中称 Maisa Studio “only for enterprises with a few millions ARR”。这是创始人一手自报，值得保留，但没有审计、精确数值和收入构成，不能与后续 400% 增长直接计算当前 ARR。

## 客户与结果证据

### 目前最强的具名信号：Santander

2026-05，Maisa 发布 David 与 Santander Chief Data and AI Officer / Global Head of AI Adoption José Palacio 在 Revolution Banking 的联合演讲总结，并称双方已合作一年，把 AI 带入高风险银行运营。文章明确提到：

- Santander 的每个 AI use case 必须增加收入、降低成本或降低风险之一；
- Maisa 的模型无关架构允许先用强模型定义流程，再切换轻量模型执行以控制 ROI；
- 业务专家可直接构建和配置 Digital Worker；
- 数据、governance/risk/compliance、组织 transformation mindset 是规模化前提。

这是具名客户高管参与的强信号，足以证明合作存在并进入真实银行场景讨论；但文章由 Maisa 发布，没有具体 workflow、任务量、上线范围、错误率、人工介入、续约或客户侧页面，因此不能升级为完整生产成效审计。

### 供应商案例中的结果数字

| 场景 | 厂商公开数字 | 证据边界 |
|---|---|---|
| 授权书核验 | 每年释放 40,000 小时、首地区节省 €1.2M、小时缩短为分钟 | 客户未具名，供应商案例 |
| 贸易融资 | 6x capacity、80% faster、93% automation accuracy | 客户未具名，定义与样本量未公开 |
| 汽车贷款 | 98% extraction、3x faster、85% less manual review | 客户未具名，未见客户侧确认 |
| 交易检查/对账 | 过滤 99% false positives、每人 10x productivity、3 次 onboarding | 融资新闻稿中的供应商自报 |
| Elecnor | 几周内从半结构化 SOP 到 functional worker | 具名 logo 与 PR 引语，未找到客户自有页面 |

首页当前展示 Santander、Indigo、Elecnor、Job&Talent、Clikalia、QIMA、Ubexo 等 logo。除 Santander 联合演讲外，本轮对 Elecnor、Job&Talent、Clikalia 和 Santander 官网的精确检索均无客户侧 Maisa 页面。logo 只能表达厂商声称存在商业关系，不能自动等于 production、付费、规模或 ROI。

## 团队与融资

![Maisa 2025 年 $25M seed 官方融资图，右侧为两位创始人](assets/maisa/funding.jpg)

### 创始人

- **[[person.david-villalon|David Villalón]]，CEO**：官方资料称此前任 Clibrain Chief AI Officer、Voicemod Director of Product；当前 LinkedIn 14,258 followers，X 1,897 followers。其公开表达集中在 KPU、生产可靠性、企业成本和演示。
- **[[person.manuel-romero-maisa|Manuel Romero]]，CSO**：X bio 为 Maisa CSO/Co-founder、Hugging Face Head Contributor/Ambassador，参与 BigScience/BigCode，曾在 Narrativa AI；官方称其创建 700+ 模型、每月 15M downloads。LinkedIn 6,786 followers，X 19,975 followers。

两人此前在 Clibrain 共事。LinkedIn 公司页当前 employee range 为 51-200，people 搜索显示 93 个关联结果，本轮抽到 AI Automation、FDE、DevOps/SRE、backend 等岗位。这能说明团队包含重交付与平台工程角色，不等于精确在职人数。TechCrunch 2025-08 记录公司当时约 35 人并计划 2026 Q1 增至 65 人。

### 融资关系

| 时间 | 轮次 | 金额 | 投资方 |
|---|---|---:|---|
| 2024-12-25 | Pre-seed | $5M | NFX 领投；Village Global、Sequoia Scout Fund 参与，另有 Lukas Haas 等 angels |
| 2025-08-28 | Seed | $25M | Creandum 领投；Forgepoint Capital International 参与；NFX、Village Global 跟投 |

累计公开融资为 $30M。每条 investment 的 amount_text 都表示整轮总额，没有向单家投资人分配金额。Sequoia Scout Fund 也被单独建模，不写成 Sequoia Capital 直接投资。

## Launch、增长与 GTM

Maisa 不是一次 launch 完成的产品：

- **2024-03-15/16**：KPU 首次公开发布，随后两次进入 HN；
- **2024-12**：完成 $5M pre-seed，开始强调真实企业流程；
- **2025-07-15**：官方发布 Maisa Studio 2 分钟视频；
- **2025-08-28**：Studio 随 $25M seed 正式发布，公开定位从 reasoning system 收敛到 enterprise digital workers；
- **2026-02**：PR 宣称 400% YoY growth、客户数 5x、headcount 5x，并出现 Elecnor 具名引语；
- **2026-05**：与 Santander AI 负责人共同讨论银行规模化落地；
- **2026 当前**：官网把“regulated industries”“BPO-like approach”“predictable pricing”放到首屏，明显进入企业采购语言阶段。

早期 KPU 的社区叙事是“旧模型也能超过 o1/Claude benchmark”；后来的 Studio 则把传播重点换成 mission-critical workflow、ROI、auditability 和 Gartner recognition。这是一次明确的 GTM 重构：从技术突破吸引关注，转向企业流程和行业可信度成交。

官网没有公开注册，所有入口都是 Schedule a Demo/Contact Sales。没有确认 Product Hunt launch，HN 初次传播也没有形成讨论。因此当前增长更依赖：

1. 两位创始人的技术和行业影响力；
2. NFX、Creandum、Forgepoint 与 Santander 关系背书；
3. 银行、能源、制造等行业活动和客户共创；
4. FDE/automation consultant 式交付；
5. Gartner、Forbes、TechCrunch 等第三方注意力。

## 流量与社区

本轮 Similarweb 入口登录态失效，没有取得可复核访问量、渠道、国家、关键词或 similar sites；不制造流量估算，见 [[source.maisa.similarweb-unavailable]]。

可确认的公开分发信号：

- X 官方账号 3,224 followers、67 tweets；David 1,897 followers；Manuel 19,975 followers；
- HN 精确域名两条 KPU 发布分别 3 points 和 2 points，均 0 comments；
- Reddit 搜索返回 10 个候选，只有 1 个在标题/正文精确命中 maisa.ai，讨论集中在 KPU benchmark 与 tool calling/system prompt 推测；
- 微信约 20 条结果，早期主要作为 Devin/AI search/大模型周报中的一小段，2026 年开始与企业 Agent 控制面赛道一起被提及；
- Product Hunt 精确检索无结果；
- 官方 YouTube 的 Maisa Studio 视频仅 90 views，自动字幕轨道存在但正文抓取为空，不能用作转录证据。

当前没有足够社区样本评估易用性、失败率、实施周期或 support。社区弱不一定意味着收入弱，因为 Maisa 是 demo-gated enterprise sales；但它意味着外部无法独立验证厂商的大部分可靠性与规模主张。

## 竞品与相邻产品

| 层 | 代表 | 与 Maisa 的关系 |
|---|---|---|
| Enterprise Agent lifecycle/control plane | [[company.relevance-ai|Relevance AI]]、[[company.ema|Ema]] | 同一买方与预算，均覆盖 build/deploy/monitor/govern；Maisa 更强调运行时流程和 Chain of Work |
| Enterprise automation/RPA | [[company.uipath|UiPath]]、Automation Anywhere | 同一流程自动化预算；传统工具设计时流程更固定，但已有成熟治理、生态和采购基础 |
| Agent/workflow builder | CrewAI、n8n、Dify | 构建层重叠；Maisa 主动反对“boxes and arrows”，并把 business user、production reliability 作为差异 |
| 职位型 AI employee | [[company.viktor|Viktor]]、11x 等 | 都卖数字劳动力；Maisa 不依赖 Slack/Teams 人设，更接近受监管流程执行平台 |
| 垂直流程平台 | [[company.floatbot|Floatbot]] | Floatbot 用行业模型、FDE 与长实施深耕保险；Maisa 更横向，但也需要行业规则和实施 |
| Agent runtime/OS | [[company.tasklet|Tasklet]] | 都让 Agent 动态决定步骤；Tasklet 更像通用 cloud agent OS，Maisa 叠加 enterprise process、audit 和治理包装 |

不能把搜索共现或 Similarweb similar sites 直接当 direct competitor。真正 direct 的标准是同一企业流程预算、同一业务/AI/IT 买方、同一上线和治理责任。

## 关键判断

1. **Maisa 最值得学习的是把 Agent-first 变成企业可采购对象。** “动态规划”本身容易显得不可控，Maisa 用 acceptance criteria、code execution、Chain of Work、worker lifecycle 和 BPO-like packaging 把它重新包装为流程自动化。
2. **Chain of Work 比“数字员工”品牌更有长期价值。** 角色、人设和自然语言 builder 容易复制；可验证的执行收据、异常分类、人工介入和业务规则追踪更接近组织资产。
3. **它在控制三层中的位置很清楚：工作 + runtime，身份仍较弱。** Maisa 定义流程、运行 worker、管理访问和证据，但没有公开 NewCore 式 task-scoped identity/token 基础设施，也没有 Paperclip 式明确 Issue/owner/dependency 组织合同。
4. **“hallucination-resistant”是好楔子，但绝对化会反噬。** 企业真正需要的是已定义错误率、accepted outcome、人工介入、rollback 和 incident data，而不是“no false positives”。目前公开材料在机制解释上强，在失败统计上弱。
5. **公司可能已经有真实 enterprise revenue，但外部规模仍不可复算。** 创始人几百万 ARR 自报、400% 增长、5x 客户与“thousands of companies”无法拼成一致时间序列。最稳妥结论是“已有生产客户和显著商业化信号，精确规模未知”。
6. **Santander 既是客户信号，也是资本/GTM 放大器。** Forgepoint 的欧洲 JV 与 Santander 参与 seed，Santander 高管又与 Maisa 联合公开分享。关系可能降低大型银行进入门槛，但也需要区分投资关系、演讲背书和产品成效。
7. **采购成熟度仍有表面债务。** 官网有“Write another line to complete the copy”模板残留，安全 footer 只写“Audit in progress”，公开价格、Trust Center、认证报告、SLA 和失败指标都缺失。对受监管行业定位而言，这些不是小问题。

## 待验证与更新触发器

- Santander、Elecnor、Job&Talent、Clikalia、QIMA 等客户侧实施页面、续约和任务结果；
- 独立 end-to-end reliability benchmark，尤其 plan generation、tool failure、self-healing 与 rollback；
- accepted outcomes、human interventions、cost per accepted output、incident/rollback rate；
- 公开 pricing、合同计量、hard budget 与服务/实施收入占比；
- “few millions ARR”、400% growth、5x client base 和 thousands of companies 的定义与时间基线；
- SOC 2/ISO/penetration report、Trust Center、SLA、审计日志保留与防篡改；
- 当前 headcount、FDE/automation consultant 占比与地区分布；
- Similarweb/Semrush 流量、渠道、关键词和地理数据恢复；
- Product Hunt、社区独立用户评价和真实失败案例；
- self-healing 变更的版本、审批、回归与撤销机制。

## 证据库

### 官方产品、治理与法律

- [[source.maisa.homepage]]、[[source.maisa.platform]]、[[source.maisa.digital-workers]]
- [[source.maisa.build]]、[[source.maisa.manage]]、[[source.maisa.trust]]
- [[source.maisa.chain-of-work]]、[[source.maisa.how-workers-work]]
- [[source.maisa.cost-control]]、[[source.maisa.n8n-comparison]]
- [[source.maisa.terms]]、[[source.maisa.privacy]]

### 客户、融资与增长

- [[source.maisa.power-attorney]]、[[source.maisa.trade-finance]]、[[source.maisa.santander]]
- [[source.maisa.preseed]]、[[source.maisa.seed]]
- [[source.maisa.techcrunch-seed]]、[[source.maisa.forbes-preseed]]
- [[source.maisa.nfx-thesis]]、[[source.maisa.forgepoint-thesis]]、[[source.maisa.growth-pr]]
- [[source.maisa.david-arr]]、[[source.maisa.customer-side-scan]]

### 人物、发布与社区

- [[source.maisa.x-profile]]、[[source.maisa.david-profile]]、[[source.maisa.manuel-profile]]
- [[source.maisa.linkedin-company]]、[[source.maisa.linkedin-founders]]
- [[source.maisa.david-demo]]、[[source.maisa.youtube-studio]]
- [[source.maisa.hn-scan]]、[[source.maisa.reddit-scan]]、[[source.maisa.wechat-scan]]
- [[source.maisa.producthunt-scan]]、[[source.maisa.similarweb-unavailable]]
