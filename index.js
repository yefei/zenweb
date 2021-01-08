'use strict';

const { app, router, start } = require('./lib/core');
const { logger } = require('./lib/log');
const { fail, setFailOptions } = require('./lib/fail');

 module.exports = {
  app,
  router,
  start,
  logger,
  fail,
  setFailOptions,
 };
