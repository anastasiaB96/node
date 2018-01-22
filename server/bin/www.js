'use strict';

import config from 'config';
import { createServer } from '../libs/server';
import env from '../libs/env';
import logger from '../libs/logger';

const port = config.get('server.port');

createServer().then(
  app => app.listen(port, () => {
    const mode = env.NODE_ENV;
    logger.info(`Server listening on ${port} in ${mode} mode`);
  }),
  err => {
    logger.error('Error while starting up server', err);
    process.exit(1);
  }
);
