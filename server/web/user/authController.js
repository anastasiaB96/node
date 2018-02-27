'use strict';

import { createController } from 'awilix-koa';
import { login } from '../../middlewares/login';

class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(ctx, next) {
    const createdUser = await this.userService.create(ctx.request.body);

    if (createdUser) {
      return next();
    } else {
      ctx.unauthorized('User already exists');
    }
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register', {
    after: [login]
  })
  .post('/login', '', {
    before: [login]
  })
