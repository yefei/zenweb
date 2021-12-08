import { create } from 'zenweb';

export const app = create({
  body: {
    multipart: true,
  },
  api: {
    failCode: 500,
    failStatus: 200,
    success(data) {
      return { path: this.path, code: 200, data };
    },
  }
});

app.start();
