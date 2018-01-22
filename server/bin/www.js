import config from 'config';
import { createServer } from '../libs/server';
import env from '../libs/env';

const port = config.get('server.port');

createServer().then(
  app => app.listen(port, () => {
    console.log(env.NODE_ENV);
  }),
  err => {
    console.error(err);
    process.exit(1);
  }
);
