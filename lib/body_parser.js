/**
 * @typedef {import('./core')} Core
 */
'use strict';

const bodyParser = require('koa-bodyparser');
const debug = require('debug')('zenweb:body-parser');

/**
 * @param {Core} core
 */
function setup(core, options) {
  options = Object.assign({
    enableTypes: ['json', 'form', 'text'],
  }, options);
  debug('options: %o', options);
  core.koa.use(bodyParser(options));
}

module.exports = {
  setup,
};
