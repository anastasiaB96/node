'use strict';

import winston from 'winston';

/*const logger = new winston.Logger({
  transports: [new (winston.transports.Console)({
    timestamp: true
  })]
});*/

class Logger {
  constructor() {
    this._init();
  }

  _init() {
    this._logger = new winston.Logger({
      transports: [
        new (winston.transports.Console)({
          timestamp: true,
          handleExceptions: true
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
