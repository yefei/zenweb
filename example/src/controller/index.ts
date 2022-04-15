import { Context, inject, mapping } from '../../../src/index';
import { HelloService } from '../service/hello_service';

export class Index {
  @inject
  ctx: Context;

  @mapping()
  index() {
    this.ctx.body = {
      hello: 'world',
      time: Date.now(),
    };
  }

  @mapping({ path: '/name/:name' })
  name(ctx: Context) {
    this.ctx.body = {
      name: this.ctx.params.name,
    };
  }

  @mapping()
  error() {
    // 错误输出终止执行
    this.ctx.fail('error demo');
    console.log('后续代码不会执行');
  }

  @mapping()
  success() {
    // 使用 success 统一包装返回格式
    this.ctx.success('ok');
  }

  @mapping()
  log() {
    this.ctx.log.info('Context log');
    this.ctx.body = 'hello';
  }

  @inject
  helloService: HelloService;

  @mapping()
  service() {
    this.ctx.body = this.helloService.say();
  }

  @mapping({ path: '/x-process-time' })
  async processTime() {
    await sleep(1000);
    this.ctx.body = 'ok';
  }

  @mapping({ method: 'POST' })
  typecast() {
    this.ctx.body = this.ctx.helper.body({
      kw: 'trim',
      count: 'int',
      is: 'bool',
      list: '!int[]',
      trim: 'trim',
      trimList:'trim[]',
    });
  }

  @mapping({ method: 'POST' })
  post() {
    this.ctx.body = this.ctx.request.body;
  }

  @mapping({ method: 'POST' })
  file() {
    console.log('file:', this.ctx.request.files);
    this.ctx.body = this.ctx.request.body;
  }

  @mapping()
  page() {
    const page = this.ctx.helper.page({ allowOrder: ['aaa'] });
    this.ctx.success({ page });
  }
}

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
