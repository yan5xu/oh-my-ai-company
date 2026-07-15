# Kylon 调研过程与本轮反思
# Kylon 调研过程与本轮反思

## 本轮路径

从 Leonis portfolio 中已有的薄主体 [[company.kylon]] 开始，先查官网与 app 状态，再顺着 Docs 拆出 workspace / gateway / proxy / billing，随后查 npm、GitHub、App Store、LinkedIn 团队、创始人历史产品、投资归属、网站流量和中英文社区。

## 关键纠错

1. 官网文案容易把 Kylon 看成 AI coworker；Docs 显示它已经在做本地 daemon、workspace CLI、provider routing、credits 和 request attribution，产品边界比营销页深。
2. npm 近 30 天 9,845 downloads 看起来很大，但同期有大量 prerelease。它证明安装活动，不证明用户或客户。
3. PearX S25 和 Atria 的线索属于历史 Kepler AI，不属于 Kylon。共享创始人不是融资继承。
4. Ashton 被官方博客称为 co-founder，但当前 LinkedIn 和员工列表没有 Kylon。保留历史官方身份，同时降级当前 operating role。
5. Reddit/HN adapter 返回了 `kylin.io` 等近似词旧帖子。逐条核对域名后全部判为 false positive，没有把它们当社区反馈。
6. 官网文章写 free trial，当前 app 和官网都写 waitlist / early access。保留冲突，不推断已全面开放。

## 本轮新增的方法候选

- **实现深度与采用规模分轨**：Docs、package、release note、app 版本证明 ship；流量、客户、社区、付费、留存证明 adoption。两条链不能互换。
- **产品谱系做四层核对**：人、品牌、法律主体、融资分别建模；只有明确证据才建立 rename / acquisition / legal continuity。
- **竞品比较页可用于反推产品 contract**：厂商会在对比中暴露真正重视的架构维度，但仍属于自利材料，需要 Docs、Terms 和产品入口交叉验证。
- **包下载先检查版本密度**：npm / PyPI 下载必须结合发布日期、prerelease、CI 与 package manager 行为解释。
- **社区精确搜索也要验实体**：公司名短、近似拼写多时，不能只信 adapter count，必须核对域名、作者和上下文。

## 对过往几轮的比较

Pancake 强在 GTM 与经营数据自报，Kylon 强在开发文档和底层控制面；Polsia 强在 live operating dashboard。三者再次说明“AI company / AI employee”不是单一产品类别：要分别看执行 runtime、协作入口、经济控制、公司数据和对外增长证据。

本轮把上述候选写入 [[method.product-research-workflow-v0]]，但只新增证据分轨与谱系核对，不把 Kylon 的具体架构固化为所有产品的必查模板。
