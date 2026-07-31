# DeepSeek-V4-Flash-0731 官方模型卡与权重

官方 Hugging Face 模型卡称 0731 为替代 Preview 的正式版本，沿用 DSpark 结构并附加 speculative decoding module，权重以 MIT License 发布。

模型卡给出的能力边界包括 low/high/max reasoning、最长 1M context、最长 384K output，以及 vLLM 部署示例。官方示例使用单节点 4×GB300；这说明权重开放不等于普通单卡即可完整部署。

官方 agent benchmark 中，Terminal Bench 为 82.7、NL2Repo 为 54.2、CyberGym 为 76.7、DeepSWE 为 54.4；这些结果仍受官方 Harness、effort 和内部数据集边界约束。

直接来源：https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-0731

