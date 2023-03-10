# ZenWeb
基于 Koa 的模块化轻量级 Web 开发框架。
本框架全部由 typescript 编写

## 文档
[ZenWeb 文档](https://zenweb.node.ltd)

## 内置模块
- [meta](https://www.npmjs.com/package/@zenweb/meta) 运行基本信息，例如：请求耗时
- [log](https://www.npmjs.com/package/@zenweb/log) 日志支持
- [router](https://www.npmjs.com/package/@zenweb/router) 路由支持
- [messagecode](https://www.npmjs.com/package/@zenweb/messagecode) 统一错误消息格式化
- [body](https://www.npmjs.com/package/@zenweb/body) 请求主体解析，JSON、Form
- [result](https://www.npmjs.com/package/@zenweb/result) 统一结果返回，成功或失败
- [helper](https://www.npmjs.com/package/@zenweb/helper) 输入数据验证
- [inject](https://www.npmjs.com/package/@zenweb/inject) 注入支持

内置模块默认开启，可以通过设置配置项为 **false** 关闭


## 可选模块
- [cors](https://www.npmjs.com/package/@zenweb/cors) 跨域支持
- [sentry](https://www.npmjs.com/package/@zenweb/sentry) sentry 错误收集
- [metric](https://www.npmjs.com/package/@zenweb/metric) 生产运行健康信息收集
- [validation](https://www.npmjs.com/package/@zenweb/validation) JSONSchema 验证
- [mysql](https://www.npmjs.com/package/@zenweb/mysql) MySQL 数据库支持
- [orm](https://www.npmjs.com/package/@zenweb/orm) ORM 支持
- [view](https://www.npmjs.com/package/@zenweb/view) 视图模版渲染
- [schedule](https://www.npmjs.com/package/@zenweb/schedule) 定时任务
- [form](https://www.npmjs.com/package/@zenweb/form) 统一表单（多用于后台）
- [grid](https://www.npmjs.com/package/@zenweb/grid) 统一表格（多用于后台）
- [upload](https://www.npmjs.com/package/@zenweb/upload) 文件上传支持
- [xmlBody](https://www.npmjs.com/package/@zenweb/xml-body) XML Body 解析


## 废弃模块
- [service](https://www.npmjs.com/package/@zenweb/service) 废弃，已被 3.0 注入技术替代

## Changelog

### 3.11.1
> null 大检查! 所有项目强制开启 TS strict 模式，不再忽略 null 检查
- 更新：
  - @zenweb/body: ^3.1.1
  - @zenweb/controller: ^3.9.1
  - @zenweb/core: ^3.5.1
  - @zenweb/helper: ^3.3.1
  - @zenweb/log: ^3.2.1
  - @zenweb/messagecode: ^3.2.1
  - @zenweb/meta: ^2.4.1
  - @zenweb/result: ^3.0.1

### 3.11.0
- @zenweb/helper: ^3.3.0
  - 去除 Helper
  - 新增 QueryHelper, ParamHelper, TypeCastHelper
- @zenweb/body: ^3.1.0
  - 新增 BodyHelper 数据类型转换&校验

### 3.10.0
- update:
  - @zenweb/core: ^3.5.0
    - 新增: Core.moduleExists
    - 新增: SetupHelper.assertModuleExists
    - 修改: Core.setup 方法增加 name 参数
    - 删除: SetupHelper.checkCoreProperty
    - 删除: SetupHelper.checkContextProperty
  - @zenweb/body: ^3.0.0
    - 使用依赖注入重构，去除 xml 和 文件上传表单支持，取消的这两个作为独立模块分离。
  - @zenweb/helper: ^3.1.0
    - 使用依赖注入重构，不再支持 ctx.helper 调用
  - @zenweb/router: ^3.3.0
  - @zenweb/controller: ^3.9.0
  - @zenweb/messagecode: ^3.2.0
  - @zenweb/inject: ^3.18.0
