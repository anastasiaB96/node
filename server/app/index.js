'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';

import iocContainer from '../libs/iocContainer';
import { errorHandler } from '../middlewares/errorHandler';
import { notFoundHandler } from '../middlewares/notFound';

const app = new Koa();

const appContainer = (app.container = iocContainer.getRegisteredContainer());

app
  .use(errorHandler)
  .use(compress())
  .use(respond())
  .use(bodyParser())
  .use(scopePerRequest(appContainer))
  .use(loadControllers('web/**/*.js', { cwd: `${__dirname}/..` }))
  .use(notFoundHandler);

export default app;
