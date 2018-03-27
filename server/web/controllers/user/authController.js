'use strict';

import { createController } from 'awilix-koa';
import { login } from '../../../middlewares/login';
import { jwtProtection } from '../../../middlewares/jwtProtection';
import { adminProtection } from '../../../middlewares/adminProtection';
import BaseController from '../baseController';

class AuthController extends BaseController {
  constructor(logger, authService) {
    super(logger);
    this.authService = authService;
  }

  async register(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
      const registeredUser = await this.authService.register(userInfo);

      ctx.created(registeredUser);
    } catch (error) {
      ctx.forbidden(error);
    }
  }

  async login(ctx) {
    await login(ctx, (loggedUser) => {
      ctx.ok(loggedUser);
    });
  }

  async permitAdmin(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
      await this.authService.permitAdmin(userInfo);

      ctx.success();
    } catch (error) {
      ctx.forbidden(error);
    }
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register')
  .post('/login', 'login')
  .post('/admin', 'permitAdmin', {
    before: [jwtProtection, adminProtection]
  })
