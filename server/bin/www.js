'use strict';

import config from 'config';
import { createServer } from '../libs/server';
import logger from '../libs/logger';

const port = config.get('server.port');

createServer().then(
  app =>
    app.listen(port, () => {
      logger.info(`Server listening on ${port}`);
    }),
  err => {
    logger.error('Error while starting up server', err);
    process.exit(1);
  }
);
