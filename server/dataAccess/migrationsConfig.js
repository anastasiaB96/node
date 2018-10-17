'use strict';

require('@babel/register');

const dbConfig = require('config').get('db');

module.exports = dbConfig;
