# 项目

## 1. Weimill

Company SASS web application

1. task 任务模块
    - 文件上传与预览
2. department 部门功能
    - 部门成员，名称，权限
3. 看板模块
    - 渲染，分页加载
    - 高级搜索

## 2. Cresta AI

real time selling guide and coaching https://cresta.com/

1. policy system 构建 policy, 选择moment 和 action: 
    - 选择并构建trigger moment(keyword, emotion, timeline, ...)，
    - 匹配对应的 actions(notice, alert, checklist, document, ...) 并构建
    - simulate policy： 创建临时policy rule 并开始 conversation 对话模拟

2. conversation
    - policy rules选择和渲染
    - 模拟客户端和用户端对话发送(轮询获取), 
    - action 与 moment 渲染 (积极UI渲染和)
    - 存取对话集和构建标准对话集



## 3. Torpago

Sunwest instance https://app.visionarycorporatecard.com/

**Torpago Bank Admin Tool**

1. 后台数据渲染
2. application 管理和流程审核， document与signature管理

**Torpago Application**

1. transaction

    - 操作transaction数据，添加memo，上传receipts收据

    - 模拟生成 transaction 和 结算
    - 审核流程
    - 三方同步
    - group 操作（beta）
    - AI policy

2. user, card与department (CRUD)

3. card 分发，申请和审核，limit 额度调整，申请和审核

4. application 申请流程 和 签名

5. company settings

6. 用户角色代理申请与管理（beta）
