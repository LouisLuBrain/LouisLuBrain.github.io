---
title: 陆 祎洲
---

# 个人信息

|          |             |          |               |
| -------- | ----------- | -------- | :------------ |
| 姓名     | 陆祎洲      | 年龄     | 26            |
| 毕业学校 | 武汉大学    | 学历专业 | 软件工程 本科 |
| 联系方式 | 15629075931 | 工作经验 | 4 年          |

# 主要技术栈

<mark class="custom-tag react">React.js</mark> <mark class="custom-tag solid">Solid.js</mark> <mark class="custom-tag tailwind">Tailwindcss</mark> <mark class="custom-tag typescript">Typescript</mark> <mark class="custom-tag javascript">Javascript</mark>

# 工作经历

**1. Wishlife 2019.12-至今**

前端工程师，负责项目各模块开发，安排分配任务和 review PR，参与开发环境搭建

# 项目

## 1. Weimill

A team SASS Web Application 一款团队 SASS 管理网页应用

1. task 任务模块
   - 文件上传与预览
2. department 部门管理
   - 渲染部门列表和详情
   - 编辑部门内容和成员，控制成员权限
3. 看板模块
   - 渲染看板内容，分页加载任务
   - 渲染缩略图和拖拽支持
   - 小屏幕设备 UI 兼容

## 2. Cresta AI

[Cresta AI](https://cresta.com/): A real time selling guide and coaching Web Application
AI 实时的销售指导和并进一步训练 AI 和优化策略的应用

1. policy system 构建 policy, 选择 moment 和 action:

   - 选择并构建 trigger moment(keyword, emotion, timeline, ...)，
   - 匹配对应的 actions(notice, alert, checklist, document, ...) 并构建
   - simulate policy： 创建临时 policy rule 并开始 conversation 对话模拟

2. conversation
   - policy rules 选择和渲染
   - 模拟客户端和用户端对话发送(轮询获取),
   - action 与 moment 渲染 (积极 UI 渲染和)
   - 存取对话集和构建标准对话集

## 3. Torpago

A bank transactions and cards management Web Application
为银行提供的针对客户公司内部的账务系统，提供交易记录管理和信用卡分发，以及其他金融管理的应用
实例参考：[SunWest Bank Instance](https://app.visionarycorporatecard.com/)

**Torpago Bank Admin Tool**

1. 后台数据渲染
2. application 客户申请管理和流程审核，document 与 signature 管理

**Torpago Application**

1. Transaction

   - 操作 transaction 数据，添加 memo，上传 receipts 收据以及三方同步（sync）
   - Simulate transactions 模拟生成交易记录和结算模拟的交易
   - Approval workflow 审核流程和对流程的设置
   - Group transactions 和 Split transactions 组合与分离交易记录操作（beta）
   - AI policy 和 AI Memo 根据交易内容生成审核建议和备注

2. Card 信用卡分发，用户申请信用卡和审核，limit 卡片额度调整

3. Entities 管理，例如成员（Users）, 信用卡（Cards）和部门（Departments）

4. Applications 客户公司填写的申请和电子签名记录

5. Company Settings 客户公司对于系统的各种设置，例如（Transaction Approval 流程控制，Transaction 交易安全设置和支付设置等）
