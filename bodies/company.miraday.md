# MiraDay

> 截止：2026-08-03。证据状态：research-complete；产品仍处 Beta / early access，融资、客户和独立采用证据不足。

## 一句话定义

MiraDay 是一个面向高管、技术和其他业务关键岗位招聘的垂直 Agent 团队：它把职位澄清、市场调研、候选人寻访、证据化匹配、联系人管理与受控触达组织在持续的 Channel 中，由多个具名 Agent 分工，并把关键招聘决定保留给人。

它不是通用 Agent 控制平面，也不是已经完全交付的端到端 ATS。当前公开产品更接近“人才智能搜索 + 招聘项目工作台 + 浏览器执行层”。

## 实体消歧

- 正确品牌：MiraDay / Mira，官网 `mira.day`，LinkedIn 为 `yourmiraday`。
- 运营线索：首页版权标注 `Forward AI Labs, Inc.`；页脚地址在 Sunnyvale。政策/条款以 `Mira` 自称并使用 Newark, Delaware 邮寄地址。公开文件没有完全解释注册、合同和运营实体分工。
- [[person.mac-liu]] 同时公开担任 MiraDay Founder 和 Career International Group CTO；[[person.wilson-wang-miraday]] 同时担任 MiraDay CTO 和 Career International Group R&D Director。
- 这支持 MiraDay 与 Career International 存在强管理和技术血缘，但不支持直接写成“Career International 子公司”、已获其投资、可调用其全部客户/简历数据或继承其收入规模。
- 同名冲突：公开搜索中还有 OpenJobs AI 的招聘 Agent `Mira`、加密网络 Mira、Mira Murati 等对象，均不是本对象。

来源：[[source.miraday.homepage-2026-08-03]]、[[source.linkedin.mac-liu-2026-08-03]]、[[source.linkedin.miraday-employees-2026-08-03]]。

## 产品对象与完整工作流

### 第一客户

官网明确优先面向高管/技术猎头与 search firm，也覆盖企业内部招聘关键管理与技术岗位的团队。它卖的不是“更多简历”，而是对复杂职位形成可审阅的需求、证据链和候选人池。

### 一次任务如何运行

1. 用户创建 Channel，提交 JD 或客户 brief。
2. Atlas 做公司、市场、薪酬和需求澄清，生成 Intake Brief。
3. 人工批准或要求修改后，Scout 跨公开来源、供应商、自有索引和上传资料寻访。
4. 系统逐项解释候选人为什么满足、未知或不满足要求，生成 Evidence Brief / Talent Pool。
5. 用户审阅长名单，按需获取邮箱/电话、保存 Contacts、导出 CSV/Excel 或共享链接。
6. Vera 可做进一步研究与受控触达；发送、敏感动作和关键节点要求人工确认。

文档默认候选人池为 40 人，但这是产品默认值，不代表质量或客户接受率。

来源：[[source.miraday.docs-core-2026-08-03]]、[[source.miraday.docs-trust-data-2026-08-03]]。

## Agent 模型

| Agent | 公开职责 | 当前状态边界 |
|---|---|---|
| Mira | 项目经理，分配和协调任务 | 公开核心工作流 |
| Atlas | 需求澄清、公司/市场/薪酬调研、Intake Brief | 公开核心工作流；文字/语音的完整交互仍在演进 |
| Scout | 跨源寻访、识别过窄需求、证据化候选人池 | 公开核心工作流 |
| Vera | 长名单研究、InMail/邮件/英国电话触达 | 部分公开；WhatsApp 未来支持 |
| Sage | 面试安排、跟进和 ATS 同步 | 明确为尚未上线 |

关键点是 Channel 内的持续上下文和 Agent Team，而非一次聊天回复。但文档也明确新 Channel 从空上下文开始，跨 Channel 偏好记忆尚未交付。

## 已上线、未来与未实测

### 有当前公开证据

- 官网、文档、Beta 登录入口和 waitlist；
- Channel、Agent Team、候选人池、逐项匹配证据、导出/分享、Contacts 和个人 Skills 的完整产品文档；
- Chrome Web Store 上的扩展 0.4.10（2026-07-29 更新）；
- Google、Microsoft、邮箱登录入口；
- 扩展的独立受控窗口、日志/截图、登录/CAPTCHA/敏感动作停点设计。

### 明确未完全交付

- ATS 直接集成；
- Sage；
- WhatsApp；
- 部分 Research / Watcher 能力；
- 正式定价、GA、独立 Credits 余额页；
- 跨 Channel 偏好记忆；
- Skill 的内置团队分享。

### 本轮没有证明

- 未注册、未登录，故没有账号内端到端搜索、触达、rollback、多人协作或 Credits 实测；
- 没有证明图示中的每个数据源/ATS 已可连接；
- 没有证明系统能在所有第三方网站合法稳定执行。

## 技术与数据

MiraDay 把底层分为 AgentOS 和 F2D。AgentOS 负责长程任务、Skills、多模型路由、沙箱、人工审核、护栏和审计；F2D 负责跨来源检索、身份解析、数据标准化和证据链。

候选数据来源包括公开网站、Exa/Apollo/RocketReach 等供应商、用户上传文件、自有索引和浏览器扩展。厂商自述索引覆盖 4.5B public records，但没有独立审计，不能等同于 45 亿独立候选人或新鲜档案。

匹配层称为 MRE，以逐项 met / uncertain / not met 取代纯关键词和单一数值分。MiraDay 文档引用 [[source.arxiv.pjb-2603.17386]] 与 [[source.arxiv.cre-t1-2603.17387]]；两篇论文均署名 CareerInternational Research Team，证明研发血缘显著。论文和文档榜单没有经过本轮重跑，且公开资料没有精确证明 MRE 线上版本等于 CRE-T1 论文模型。

## 权限、数据与治理

浏览器扩展是最强能力，也是风险集中点：它可以读取已登录页面、截图、URL、导航和表单内容，并在用户会话内执行动作。密码字段声称自动遮蔽；敏感网站、登录、CAPTCHA、2FA、支付、删除和发送等动作设停点。

公开治理边界：

- 用户需要保证第三方网站自动化符合其条款；
- 用户对扩展授权动作承担主要责任，服务不保证可撤销；
- Mira 不保证候选数据准确、完整或及时，也不作为就业中介/招聘顾问；
- 用户和候选数据据称不用于训练底层模型，但这是政策/合同声明，不是独立审计；
- 基础设施主要在美国，存在跨境传输；
- 候选数据处理中的 controller / joint controller / processor 角色仍按活动判断且处法律审查；
- 官网说仍在准备审计和推进 EU AI Act 合规，不能称已认证。

来源：[[source.miraday.docs-browser-2026-08-03]]、[[source.miraday.privacy-2026-08-03]]、[[source.miraday.terms-2026-08-03]]、[[source.miraday.chrome-store-2026-08-03]]。

## 团队、公司阶段与商业化

- [[person.mac-liu]]：Founder；同时为 Career International Group CTO。
- [[person.wilson-wang-miraday]]：CTO；同时为 Career International Group R&D Director。
- LinkedIn 另可见两位 Product Manager；公司页自述 11–50 人，但公开员工搜索只返回 4 人，不能据此确定真实 headcount。
- Mac Liu 的 MiraDay 经历从 2026-05 起；官网博客从 2026-04 开始发布，政策在 2026-03 生效。最稳妥的阶段表述是 2026 年春季进入公开准备与 Beta，而不是给出未经确认的正式 launch day。
- 当前试用免费、提供 Credits；价格将在 GA 前公布。隐私政策明确当前没有支付处理商。
- 本轮未发现具名客户、客户案例、收入、合同、融资轮次或投资方的可靠公开证据。

Career International 的 2025 年收入、客户、员工与服务规模见 [[source.careerintl.investor-facts-2026-08-03]]，只能作为产业背景，不能归到 MiraDay。

## 市场反馈与采用证据

截至 cutoff，本轮在 X、Reddit、LinkedIn 和 Product Hunt 没有取得可验证的独立用户评价或客户案例。LinkedIn 公司页显示 57 位关注者；Chrome 商店证明扩展已上架，但没有可消费的用户规模和独立评论。

Similarweb 与 Semrush 均在报告载入前 STOP，见 [[source.traffic.miraday-2026-08-03]]。这意味着流量未知，不是零流量或 no-data。

因此，关于“市场已经认可”“已有规模化客户”“招聘效率/质量显著提升”的说法当前都缺少独立证据。Career International 旧材料中的 `matching accuracy +60%` 是其内部算法 benchmark 自述，不是 MiraDay 客户 ROI。

## 竞争位置与 Parall 关系

MiraDay 与通用 Agent 产品的重叠点是：长生命周期 Agent 团队、具名角色、Channel 上下文、Skills、浏览器执行、人工审核、动作日志和审计。它与 Parall 的关系可归为**垂直相邻产品，局部直接重叠**：

- 重叠层：Agent 协作与运行、浏览器执行、权限停点、长期任务状态；
- MiraDay 专属层：人才数据、person-job retrieval、候选人证据、Contacts、触达和招聘合规；
- 产品层级差异：MiraDay 面向 recruiter 卖招聘结果，Parall 面向更广泛的 Agent 工作与协作基础设施。

当前证据不足以判断谁的通用 Agent runtime、长期记忆、权限模型或执行可靠性更强，也不足以把 MiraDay 归为 Parall 的完整直接替代品。

## 初步判断

1. **这不是普通“AI 搜简历”工具。** 其产品设计把需求澄清、市场研究、证据化匹配、浏览器操作和多人审批组织成持续项目，垂直工作流完整度较高。
2. **最大资产可能是 Career International 的技术与场景血缘，而非当前市场规模。** 双重任职、CRE/PJB/Agent 研究连续性都可确认；但法律、数据和商业资源是否转移仍未知。
3. **当前仍是早期产品验证阶段。** Beta、无正式价格、功能路线图、低公开关注和缺少独立客户证据比官网完整度更能限制外推。
4. **权限与数据风险不是附属问题。** 它依赖公开人才数据、第三方供应商和已登录浏览器，对候选隐私、第三方 ToS、动作责任、数据角色和跨境处理提出持续要求。

## 未知与后续触发器

- Forward AI Labs, Inc. 的注册、股权、融资和与 Career International 的正式法律关系；
- 是否获得 Career International 数据、客户或 IP 的正式授权；
- 具名客户、付费转化、收入、留存、招聘成功率和客户 ROI；
- GA 时间、正式价格、Credits 单价和企业合同条款；
- ATS 直连、Sage、Watcher、团队 Skill 分享和跨 Channel 记忆的实际上线状态；
- MRE 线上模型、BRIGHT 结果和 PJB 的独立复现；
- 扩展在 LinkedIn 等关键站点上的合规与稳定性；
- SOC 2、ISO 27001、EU AI Act 等外部认证。

更新触发器：公开融资/注册文件、GA/定价、具名客户案例、ATS 上线、合规认证、扩展条款变化、独立评测或 provider 访问恢复。

## 主要来源

- [[source.miraday.homepage-2026-08-03]]
- [[source.miraday.docs-core-2026-08-03]]
- [[source.miraday.docs-browser-2026-08-03]]
- [[source.miraday.docs-trust-data-2026-08-03]]
- [[source.miraday.docs-commercial-2026-08-03]]
- [[source.miraday.privacy-2026-08-03]]
- [[source.miraday.terms-2026-08-03]]
- [[source.linkedin.mac-liu-2026-08-03]]
- [[source.careerintl.ai-lineage-2025]]
- [[source.arxiv.pjb-2603.17386]]
- [[source.arxiv.cre-t1-2603.17387]]
- [[source.miraday.public-feedback-search-2026-08-03]]
- [[source.traffic.miraday-2026-08-03]]
