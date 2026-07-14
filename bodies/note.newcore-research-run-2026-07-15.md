本轮 seed 来自 AI employee / Agent-native workspace 赛道扩张：完成 [[company.paperclip]] 后，需要继续向其下游的身份、授权与安全层追一跳。

## 实际调研路径

1. **主体与产品面**：官网首页、identity discovery、security、agentic governance、EMA、About、Careers、Trust Center。
2. **融资与关系网**：公司发布稿、Index 官方投资文章、Globes、Jerusalem Post、BankInfoSecurity 创始人采访。
3. **团队与 GTM**：LinkedIn 公司和创始人资料、美国/特拉维夫招聘结构、Identiverse 发布节点。
4. **规模**：第三方流量页面、LinkedIn/X 分发信号；无数值时保存 metadata-only，不补估。
5. **社区**：X、微信、小红书、Reddit、LinuxDo、V2EX。命中主要是融资与赛道转述，没有独立使用反馈。
6. **竞品反证**：不是罗列 IAM 厂商，而是用 Arcade、Oasis、Astrix 对照身份主体、授权时机、intent、inventory 与 enforcement 的不同设计。

## 本轮纠正的判断

- 初始容易把 NewCore 理解成“AI Agent 身份管理工具”。补读创始人采访后发现，公司实际想拥有 directory、login、SSO、MFA 与 federation，Agent governance 是新架构入口，战场是核心 IAM。
- 初始容易把“独立 Agent identity”当成行业共识。Arcade 的反向观点说明，很多场景可能更适合 app identity × delegated user；研究应保留架构争议。
- 6600 万美元首发容易让人高估业务规模。客户检索、文档检索、社区与流量均缺乏采用证据，应明确降级为强团队/资本信号。

## 方法反思

这轮验证了 [[method.product-research-workflow-v0]] 已有的“从治理 claim 追完整控制环”，并补充了身份产品特有的检查链：principal → delegation → task/session → scope → token mint → policy → enforcement → revocation/audit。

它不是固定模板。当前只有 NewCore、Arcade、Oasis、Astrix 四个公开样本；后续还需在 Token Security、Aembit、Okta/Entra 的 Agent 能力和真实企业部署中复验。

## 工具与证据问题

- Twitter adapter 曾在一轮里 exit 0 但无输出；异步反馈后 site-forge 复测正常，可能是 Edge target/runtime 瞬断。未把空输出解释为无账号。
- 流量平台无数值时只建 metadata-only snapshot，不能补 0。
- TechCrunch 页面本轮不可稳定抓取；未使用空壳正文，改用官方、Globes、BankInfoSecurity 与 Jerusalem Post。
- 搜索没有命中客户或社区使用，不等于客户不存在；只写“本轮未找到”。
