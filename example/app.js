'use strict';

process.env.DEBUG = '*';

const app = module.exports = require('..')({
  fail: {
    defaultCode: 500,
    defaultHttpCode: 200,
  }
});

// app.setup('../mod/sentry', { dsn: 'xxxx' });
app.start();
