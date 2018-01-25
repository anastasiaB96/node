'use strict';

import winston from 'winston';
import config from 'config';

const loggerConfig = config.get('logger');

const logger = new winston.Logger({
  transports: [new (winston.transports.Console)()]
});

/*class Logger {
  constructor(logger) {
    this._logger = new logger.Logger({
      transports: [new (logger.transports.Console)()]
    });
  }

  info(message) {
    this._logger.info(message);
  }

  error(message) {
    this._logger.error(message);
  }
}

const logger = new Logger(winston);*/

export default logger;
