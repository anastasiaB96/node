'use strict';

import * as http from 'http';
import app from '../application';
import logger from './logger';

export async function createServer() {
  logger.info('Server creating.');

  const server = http.createServer(app.callback());

  server.on('close', () => {
    app.container.dispose();
    logger.info('Server closing.');
  });

  logger.info('Server created.');

  return server;
}
