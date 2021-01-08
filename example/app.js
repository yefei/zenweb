'use strict';

process.env.DEBUG = '*';

const App = require('..');

const app = new App({
  failCode: 500,
  failHttpCode: 200,
});

module.exports = app;
