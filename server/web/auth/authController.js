'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import Controller from '../helpers/controller';
import { userRegisterValidator, userLoginValidator, permitAdminValidator } from './authValidator';

class AuthController extends Controller {
  constructor(errorsHelper, authService) {
    super({ errorsHelper, service: authService });
  }

  async register(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
      const registeredUser = await this.service.register(userInfo);

      return ctx.created(registeredUser);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async login(ctx) {
    try {
      const userData = this.getContextBody(ctx);
      const loggedUser = await this.service.login(userData);

      return ctx.ok(loggedUser);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async permitAdmin(ctx) {
    try {
      const userInfo = this.getContextBody(ctx);
      await this.service.permitAdmin(userInfo);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('/register', 'register', {
    before: [userRegisterValidator]
  })
  .post('/login', 'login', {
    before: [userLoginValidator]
  })
  .post('/admin', 'permitAdmin', {
    before: [permitAdminValidator, jwtProtection, adminProtection]
  })
