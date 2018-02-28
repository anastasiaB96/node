'use strict';

import { createController } from 'awilix-koa';
import login from '../../middlewares/login';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(ctx) {
    try {
      const userData = ctx.request.body;
      const registeredUser = await this.authService.register(userData);

      ctx.ok(registeredUser);
    } catch (error) {
      ctx.unauthorized(error);
    }
  }

  async login(ctx) {
    await login(ctx, (loggedUser) => {
      ctx.ok(loggedUser);
    });
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
