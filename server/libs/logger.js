'use strict';

import winston from 'winston';
import config from 'config';

const loggerConfig = config.get('logger');

const logger = new winston.Logger({
  transports: [new (winston.transports.Console)()]
});

export default logger;
