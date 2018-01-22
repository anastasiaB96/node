'use strict';

import * as http from 'http';
import app from '../app';
import logger from '../libs/logger';

export async function createServer() {
  logger.info('Server creating.');

  const server = http.createServer(app.callback());

  server.on('close', () => {
    logger.info('Server closing.')
  });

  logger.info('Server created.');

  return server;
}
