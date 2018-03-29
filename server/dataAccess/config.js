'use strict';

require('babel-core/register');

const dbConfig = require('config').get('db');

module.exports = dbConfig;