'use strict';

import config from 'config';
import { createServer } from '../helpers/server';
import logger from '../helpers/logger';

const port = process.env.PORT || _config.default.get('server.port') || 4000;;

createServer()
  .then(app => {
    app.listen(port, () => {
      logger.info(`Server listening on ${port}`);
    })
  })
  .catch(err => {
    logger.error('Error while starting up server', err);
    process.exit(1);
  });
