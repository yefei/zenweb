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

const typeCastMap = {
  number(value) {
    value = Number(value);
    if (!isNaN(value)) return value;
  },
  int(value) {
    value = parseInt(value);
    if (!isNaN(value)) return value;
  },
  float(value) {
    value = parseFloat(value);
    if (!isNaN(value)) return value;
  },
  bool(value) {
    value = String(value).toLowerCase();
    return ['y', '1', 'yes', 'on', 'true'].indexOf(value) !== -1;
  },
};

/**
 * 类型转换
 * @param {*} value 需要被转换的值
 * @param {*} type 转换类型，可以是 typeCastMap 里预定义的，也可自己传转换函数
 * @param {*} defaultValue 转换失败返回默认值
 */
function typeCast(value, type, defaultValue) {
  if (typeof type === 'string') {
    [type, defaultValue] = type.split(':', 2);
    type = typeCastMap[type];
    if (type === undefined) {
      throw new TypeError('Unknown type cast: ' + type);
    }
  }
  value = type(value);
  if (value === undefined && defaultValue !== undefined) {
    value = type(defaultValue);
  }
  return value;
}

/**
 * 挑选输入值并进行类型转换
 * @param {{[key: string]: any}} input
 * @param {*[]} fields
 */
function typeCastPick(input, fields) {
  const out = {};
  fields.forEach(key => {
    if (typeof key === 'object') {
      Object.keys(key).forEach(k => {
        if (input[k] === undefined) return;
        const value = typeCast(input[k], key[k]);
        if (value !== undefined) out[k] = value;
      });
    } else {
      const value = input[key];
      if (value !== undefined) out[key] = value;
    }
  });
  return out;
}

module.exports = {
  findFilesSync,
  discover,
  typeCast,
  typeCastPick,
};
