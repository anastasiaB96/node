'use strict';

import Koa from 'koa';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import respond from 'koa-respond';
import session from 'koa-session';

import Container from '../libs/container';
import { errorHandler } from '../middlewares/errorHandler';
import { notFoundHandler } from '../middlewares/notFound';
import store from './session';

const app = new Koa();

const appContainer = (app.container = new Container());
const passport = appContainer.getRegistration('passport');

app
  .use(errorHandler)
  .use(compress())
  .use(respond())
  .use(bodyParser())
  .use(session({ store }, app))
  .use(passport.init())
  .use(scopePerRequest(appContainer.context))
  .use(loadControllers('web/**/*.js', { cwd: `${__dirname}/..` }))
  .use(notFoundHandler);

export default app;
