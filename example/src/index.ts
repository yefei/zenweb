import { create } from '../../src/index';

export const app = create({
  result: {
    failCode: 500,
    failStatus: 200,
    success(ctx, data) {
      return { path: ctx.path, code: 200, data };
    },
  },
  controller: {
    discoverPaths: ['./src/controller'],
  },
});

app.start();
