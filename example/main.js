'use strict';

process.env.DEBUG = '*';

const { start, setFailDefaultCode } = require('..');

setFailDefaultCode({ code: 500, httpCode: 200 });
start();
