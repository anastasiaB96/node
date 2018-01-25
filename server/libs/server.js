'use strict';

import * as http from 'http';
import { app, appContainer } from '../app';
import logger from './logger';

export async function createServer() {
  logger.info('Server creating.');

  const server = http.createServer(app.callback());

  server.on('close', () => {
    appContainer.dispose();
    logger.info('Server closing.')
  });

  logger.info('Server created.');

  return server;
}
