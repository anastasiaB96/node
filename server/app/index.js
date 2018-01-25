'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import container from '../libs/container';
import { errorHandler } from '../middlewares/error-handler';
import { notFoundHandler } from '../middlewares/not-found';

const app = new Koa();

const appContainer = (app.container = container.register());
console.log(appContainer.registrations);

app
  .use(errorHandler)
  .use(respond())
  .use(bodyParser())
  .use(scopePerRequest(appContainer))
  .use(loadControllers('web/*.js', { cwd: `${__dirname}/..` }))
  .use(notFoundHandler);

module.exports = {
  app,
  appContainer
};
