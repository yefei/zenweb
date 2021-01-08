'use strict';

const { app, router, start } = require('./lib/core');
const { logger } = require('./lib/log');
const load = require('./lib/load');
const { fail, setFailDefaultCode } = require('./lib/error');

module.exports = {
  app,
  router,
  logger,
  load,
  fail,
  setFailDefaultCode,
  start,
};
