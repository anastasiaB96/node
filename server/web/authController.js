'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(passport, userService) {
    this.passport = passport;
    this.userService = userService;
  }

  async register(ctx) {
    const user = ctx.request.body;
    const createdUser = await this.userService.create(user);

    if (createdUser) {
      ctx.ok('Success login')
    } else {
      ctx.send(409, 'User already exists');
    }
  }

  async login(ctx) {
    return this.passport.auth('login', async (err, user, info) => {
      if (user) {
        ctx.ok('Success login');
      } else {
        ctx.status = 401;
        ctx.body = info;
      }
    })(ctx);
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
