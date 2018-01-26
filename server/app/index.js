'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import container from '../libs/container';
import { errorHandler } from '../middlewares/error-handler';
import { notFoundHandler } from '../middlewares/not-found';

const app = new Koa();

const appContainer = (app.container = container.getConfiguredContainer());

app
  .use(errorHandler)
  .use(compress())
  .use(respond())
  .use(bodyParser())
  .use(scopePerRequest(appContainer))
  .use(loadControllers('web/*.js', { cwd: `${__dirname}/..` }))
  .use(notFoundHandler);

module.exports = {
  app,
  appContainer
};
