'use strict';

process.env.DEBUG = '*';

const { start, setFailOptions } = require('..');

setFailOptions({ failCode: 500, failHttpCode: 200 });
start();
