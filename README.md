# ZenWeb
基于 Koa 的模块化轻量级 Web 开发框架。
本框架全部由 typescript 编写

## 文档
[ZenWeb 文档](https://zenweb.vercel.app)

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
