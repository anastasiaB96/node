'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';

import iocContainerHelper from './helpers/iocContainerHelper';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound';
import { rateLimiter } from './middlewares/rateLimiter';

class Application extends Koa {
  constructor() {
    super();

    const appContainer = (this.container = iocContainerHelper.getRegisteredContainer());

    this.use(errorHandler)
      .use(compress())
      .use(respond())
      .use(bodyParser())
      .use(rateLimiter)
      .use(scopePerRequest(appContainer))
      .use(loadControllers('web/controllers/**/*.js', { cwd: `${__dirname}` }))
      .use(notFoundHandler);
  }
}

const app = new Application();

export default app;
