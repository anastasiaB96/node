import { createServer } from '../libs/server';

createServer().then(
  app => app.listen('3004', () => {

  }),
  err => {
    console.error(err);
    process.exit(1);
  }
);
