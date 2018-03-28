'use strict';

import { createController } from 'awilix-koa';
import { login } from '../../middlewares/login';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class AuthController extends BaseController {
  constructor(logger, authService) {
    super(logger, authService);
  }

  async register(ctx) {
    try {
      const userInfo = BaseController.getContextBody(ctx);
      const registeredUser = await this.service.register(userInfo);

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
      const userInfo = BaseController.getContextBody(ctx);
      await this.service.permitAdmin(userInfo);

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
