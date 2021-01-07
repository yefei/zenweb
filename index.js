'use strict';

const { app, router, start } = require('./lib/core');
const { logger } = require('./lib/log');
const load = require('./lib/load');
const { fail } = require('./lib/error');

module.exports = {
  app,
  router,
  logger,
  load,
  fail,
  start,
};
