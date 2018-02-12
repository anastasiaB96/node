'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(passport) {
    this.passport = passport;
  }

  async register(ctx) {
    return this.passport.auth('signup', async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info;
      } else {
        ctx.ok('Success signup');
      }
    })(ctx);
  }

  async login(ctx) {
    return this.passport.auth('login', async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info;
      } else {
        ctx.ok('Success login');
      }
    })(ctx);
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
