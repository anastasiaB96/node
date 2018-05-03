'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import Controller from './controller';

class AuthController extends Controller {
  constructor(errorsHelper, authService) {
    super({ errorsHelper, service: authService });
  }

  async register(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
      const registeredUser = await this.service.register(userInfo);

      ctx.created(registeredUser);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async login(ctx) {
    try {
      const userData = this.getContextBody(ctx);
      const loggedUser = await this.service.login(userData);

      ctx.ok(loggedUser);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async permitAdmin(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
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
