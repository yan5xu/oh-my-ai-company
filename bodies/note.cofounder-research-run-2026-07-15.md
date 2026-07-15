本轮从 [[company.nanocorp]] 的竞品比较与关键词线索进入 [[company.cofounder]]，不是从通用搜索重新开始。研究分成产品/文档、版本时间线、融资/人物、流量/GTM、社区、条款/安全六条线。

## 实际流程

1. 官网与 pricing 确认当前 offer、目标客户、managed services、迁出和 usage 结构。
2. `llms-full.txt` 重建 Workspace、Roadmap、Departments、Agents、skills、schedule 与工程/营销/注册流程。
3. 把 2025 年公司介绍、Cofounder 1、seed、sunset、Fellowship、Cofounder 2、Ramp 串成版本与增长时间线。
4. 用 Similarweb 拆 root/include-subdomains、月访问、渠道、品牌词、地域、social 与 outgoing；不把 similar sites 自动当竞品。
5. 用 X/HN/Reddit/Product Hunt/微信/小红书/LinuxDo/V2EX 找传播与独立反馈，并记录无结果或语义污染。
6. 读 Terms 与 Vanta Trust Center，校准官网 approval 与 SOC 2 文案。
7. 把公司、人物、投资、流量、source、touchpoint、note、concept 与图片一起写入 Memex。

## 这轮改变判断的地方

- 初看像“更完整的 AI 建站工具”；docs 表明它把 incorporation、managed infra、销售、营销与支持也纳入 roadmap，因此应归到公司控制面。
- 官网“nothing ships without approval”容易让人以为逐次强制审批；Terms 明确允许用户授权自动合并、部署、发信和付款，正确结论是可配置授权与责任边界。
- 案例页看起来像客户证明；追到 Agent Fund 投资关系与 Fellowship 现金/credits 后，应降级为战略/补贴 cohort 采用证据。
- 5 月流量暴涨并不等于稳定增长。6 月回落约一半，搜索 91% 品牌词，当前更像重新发布成功、留存待证。

## 方法增量

与 [[company.polsia]]、[[company.nanocorp]] 对照，本轮再次验证公司生成漏斗与补贴 cohort 审计；新增三个值得继续观察的动作：

- **版本重构断点**：产品 sunset / rewrite / relaunch 时，旧用户、旧指标和新流量不能直接连成一条增长曲线。
- **Marketing promise vs operating contract**：对高副作用 Agent，官网审批承诺必须和 Terms、权限、merchant responsibility、审计与回滚并排读。
- **公开 counter 定义漂移**：同站不同页面的 company/agent counter 要保留时间与定义差异，不能用最新最大值覆盖旧口径。

这些内容已补入 [[method.product-research-workflow-v0]]，仍作为候选动作，不视为所有品类的固定模板。

## 工具与失败边界

- Vanta `browser read` 首次返回空正文；同 tab 等待动态渲染后通过 DOM 读取到 Type I、Type 2 Attestation、SOC 3 和 Type 2 Report。空壳没有被当证据。
- LinkedIn post 的 read 输出混入巨大页面状态；最终从可见正文和评论中的 Trust Center 链接提取事实，没有复用导航杂项。
- 小红书的“cofounder”高度歧义；精确域名仍是求合伙人内容，记录为语义污染，不作为产品反馈。
- Typeform outgoing 只有目的域名占比，无法确认对应 campaign；保留待解释，不映射为 Fellowship 或 signup。

本轮没有注册产品或触发外部副作用；产品能力来自公开官网、文档、条款与案例。
