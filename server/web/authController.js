'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(passport, userService) {
    this.passport = passport;
    this.userService = userService;
  }

  async register(ctx) {
    const createdUser = await this.userService.create(ctx.request.body);

    if (createdUser) {
      ctx.ok(createdUser);
    } else {
      ctx.unauthorized('User already exists');
    }
  }

  async login(ctx) {
    return this.passport.auth('login', async (err, user, info) => {
      if (user) {
        ctx.ok('Success login');
      } else {
        ctx.unauthorized(info);
      }
    })(ctx);
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
