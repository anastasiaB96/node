'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(ctx) {
    const userData = ctx.request.body;

    try {
      const registeredUser = await this.authService.register(userData);

      if (registeredUser) {
        const loggedUser = await this.authService.login(userData);
        ctx.ok(loggedUser);
      }
    } catch (error) {
      ctx.unauthorized(error);
    }
  }

  async login(ctx) {
    const userData = ctx.request.body;

    try {
      const loggedUser = await this.authService.login(userData);
      ctx.ok(loggedUser);
    } catch(error) {
      ctx.unauthorized(error);
    }
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
