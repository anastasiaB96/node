'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(passport) {
    this.passport = passport;
  }

  async register(ctx) {
  }

  async login(ctx) {
    return this.passport.auth('local', async (err, user, info) => {
      console.log('4 ' + user);
      console.log('5 ' + info);
      if (user === false) {
        ctx.status = 401;
        ctx.body = info.message;
      } else {
        ctx.ok('6 Success login');
      }
    })(ctx);
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
