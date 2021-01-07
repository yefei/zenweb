'use strict';

const fs = require('fs');
const path = require('path');
const globby = require('globby');

/**
 * 加载目录内的js文件
 * @param {string} directory 目标目录
 */
function load(directory) {
  let count = 0;
  for (const filepath of globby.sync('**/*.js', { cwd: directory })) {
    const fullpath = path.join(directory, filepath);
    if (!fs.statSync(fullpath).isFile()) continue;
    try {
      require(fullpath);
      count++;
    } catch (e) {
      console.error('Load error: %s, %s', fullpath, e.message);
    }
  }
  console.log('Loaded: %s %o files', directory, count);
}

module.exports = load;
