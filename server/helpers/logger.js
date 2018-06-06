'use strict';

import winston from 'winston';

class Logger {
  constructor(winston) {
    this._init(winston);
  }

  _init(winston) {
    this._logger = new winston.Logger({
      transports: [
        new winston.transports.Console({
          timestamp: true
        })
      ]
    });
  }

  info(message) {
    this._logger.info(message);
  }

  error(message) {
    this._logger.error(message);
  }
}

export default new Logger(winston);
