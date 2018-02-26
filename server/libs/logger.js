'use strict';

import winston from 'winston';

class Logger {
  constructor() {
    this._init();
  }

  _init() {
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

const logger = new Logger();

export default logger;
