'use strict';

process.env.DEBUG = '*';

const app = module.exports = require('..')({
  api: {
    failCode: 500,
    failHttpCode: 200,
    success(data) {
      return { path: this.path, code: 200, data };
    },
  }
});

// app.setup('../mod/sentry', { dsn: 'xxxx' });
app.start();
