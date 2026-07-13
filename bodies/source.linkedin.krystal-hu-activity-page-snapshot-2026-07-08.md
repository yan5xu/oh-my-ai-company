# Krystal Hu LinkedIn activity page probe

采集时间：2026-07-08。来源：pinixc browser open + snapshot/eval。

## 结果

打开 Krystal Hu 的 LinkedIn recent activity 页面后，当前登录态只渲染出 profile 顶卡、动态/评论/图片/回应等导航，以及“猜您认识”等推荐区域；DOM 中没有拿到 feed-shared-update-v2、article 或 data-urn activity 卡片。

这不是“她没有 LinkedIn 动态”的证据，只说明当前 browser session 对 activity list 的抓取没有稳定暴露活动卡片。相反，单条 LinkedIn post URL 可以打开并抓到完整正文，见 [[source.linkedin.krystal-hu-sf-ai-newsletter-post-2026-07-08]]。

## 工具判断

当前 site linkedin adapter 能做 profile/search/company/employees 顶层数据；LinkedIn activity feed 仍需要 browser open/snapshot/eval，且不稳定。未来如果要系统性挖媒体人的转发网络，需要专门的 LinkedIn activity adapter，至少支持：profile activity list、post detail、repost/comment actor extraction。

关联主体：[[person.krystal-hu]]。
