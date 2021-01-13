'use strict';

const debug = require('debug')('jiango:utils');
const fs = require('fs');
const path = require('path');
const globby = require('globby');

/**
 * 查找目录下的文件并返回文件名列表
 * @param {string} directory 目标目录
 * @param {string | string[]} patterns 规则
 * @returns {string[]}
 */
function findFilesSync(directory, patterns = '**/*') {
  const files = [];
  for (const filepath of globby.sync(patterns, { cwd: directory })) {
    const fullpath = path.join(directory, filepath);
    if (fs.statSync(fullpath).isFile()) {
      files.push(filepath);
    }
  }
  return files;
}

/**
 * 发现目录内的js文件并加载
 * @param {string} directory 目标目录
 * @throws {Error}
 */
function discover(directory) {
  let count = 0;
  for (const filepath of findFilesSync(directory, '**/*.js')) {
    const fullpath = path.join(directory, filepath);
    try {
      require(fullpath);
      count++;
    } catch (e) {
      throw new Error(`discover error [${fullpath}]: ${e.message}`);
    }
  }
  debug('discover [%s] %o files', directory, count);
}

module.exports = {
  findFilesSync,
  discover,
};
