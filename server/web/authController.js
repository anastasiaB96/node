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
      return this.passport.auth('login', async (err, userData, info) => {
        if (userData) {
          ctx.ok(userData);
        } else {
          ctx.unauthorized(info);
        }
      })(ctx);
    } else {
      ctx.unauthorized('User already exists');
    }
  }

  async login(ctx) {
    return this.passport.auth('login', async (err, user, info) => {
      if (user) {

        ctx.ok(user);
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
