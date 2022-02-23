import './service/_typing';
import { create } from '../../src/index';

export const app = create({
  api: {
    failCode: 500,
    failStatus: 200,
    success(data) {
      return { path: this.path, code: 200, data };
    },
  },
  router: {
    discoverPaths: ['./src/controller'],
  },
  service: {
    paths: ['./src/service'],
    patterns: '**/*.ts',
  }
});

app.start();
