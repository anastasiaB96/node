'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import session from 'koa-session';

import container from '../libs/container';
import { errorHandler } from '../middlewares/error-handler';
import { notFoundHandler } from '../middlewares/not-found';
import store from './session';

const app = new Koa();

const appContainer = (app.container = container.getConfiguredContainer());
const passport = container.getRegistration('passport');

console.log(appContainer.registrations);

app
  .use(errorHandler)
  .use(compress())
  .use(respond())
  .use(bodyParser())
  .use(session({ store }, app))
  .use(passport.init())
  .use(passport.session())
  .use(scopePerRequest(appContainer))
  .use(loadControllers('routes/*.js', { cwd: `${__dirname}/..` }))
  .use(notFoundHandler);

export default app;
