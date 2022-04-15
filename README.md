# ZenWeb
基于 Koa 的模块化轻量级 Web 开发框架。
本框架全部由 typescript 编写

## 快速开始

推荐使用 typescript 创建项目

package.json
```json
{
  "name": "app",
  "private": true,
  "main": "app/index.js",
  "scripts": {
    "dev": "cross-env DEBUG=* NODE_ENV=development ts-node src/index.ts",
    "build": "tsc",
    "start": "node app"
  }
}
```

```bash
$ npm i zenweb
```

src/index.ts
```ts
import { create } from 'zenweb';

const app = create();
app.start();
```

src/controller/hello.ts
```ts
import { Context, inject, mapping } from 'zenweb';
import { HelloService } from '../service/hello_service';

export class Index {
  @inject
  hello: HelloService;

  @mapping({ path: '/' })
  index(ctx: Context) {
    ctx.success(this.hello.say());
  }
}
```

src/service/hello_service.ts
```js
export class HelloService {
  i = 0;
  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}
```

```bash
$ npm run dev
boot time: 2 ms
server on: 7001
```

## 内置模块
1. [meta](https://www.npmjs.com/package/@zenweb/meta) 运行基本信息，例如：请求耗时
2. [log](https://www.npmjs.com/package/@zenweb/log) 日志支持
3. [router](https://www.npmjs.com/package/@zenweb/router) 路由支持
4. [messagecode](https://www.npmjs.com/package/@zenweb/messagecode) 统一错误消息格式化
5. [body](https://www.npmjs.com/package/@zenweb/body) 表单提交，文件上传支持
6. [api](https://www.npmjs.com/package/@zenweb/api) 统一接口返回 ctx.success ctx.fail 方法
7. [helper](https://www.npmjs.com/package/@zenweb/helper) 输入数据验证
8. [inject](https://www.npmjs.com/package/@zenweb/inject) 注入支持

内置模块默认开启，可以通过设置配置项为 **false** 关闭


## 可选模块
9. [cors](https://www.npmjs.com/package/@zenweb/cors) 跨域支持
10. [sentry](https://www.npmjs.com/package/@zenweb/sentry) sentry 错误收集
11. [metric](https://www.npmjs.com/package/@zenweb/metric) 生产运行健康信息收集
12. [validation](https://www.npmjs.com/package/@zenweb/validation) JSONSchema 验证
13. [mysql](https://www.npmjs.com/package/@zenweb/mysql) MySQL 数据库支持
14. [orm](https://www.npmjs.com/package/@zenweb/orm) ORM 支持
15. [view](https://www.npmjs.com/package/@zenweb/view) 视图模版渲染
16. [schedule](https://www.npmjs.com/package/@zenweb/schedule) 定时任务
17. [form](https://www.npmjs.com/package/@zenweb/form) 统一表单（多用于后台）
18. [grid](https://www.npmjs.com/package/@zenweb/grid) 统一表格（多用于后台）

## 废弃模块
1. [service](https://www.npmjs.com/package/@zenweb/service) 废弃，已被 3.0 注入技术替代
