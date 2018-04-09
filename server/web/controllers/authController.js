'use strict';

import { createController } from 'awilix-koa';
import { login } from '../../middlewares/login';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class AuthController extends BaseController {
  constructor(errorsHelper, authService) {
    super({ errorsHelper, service: authService });
  }

  async register(ctx) {
    try {
      const userInfo = BaseController.getContextBody(ctx);
      const registeredUser = await this.service.register(userInfo);

      ctx.created(registeredUser);
    } catch (error) {
      this.throwError(ctx, error);
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

      ctx.ok();
    } catch (error) {
      this.throwError(ctx, error);
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
