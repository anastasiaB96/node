'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import Controller from '../helpers/controller';
import { userRegisterValidator, userLoginValidator, permitAdminValidator } from './authValidator';

class AuthController extends Controller {
  constructor(authService) {
    super(authService);
  }

  async register(ctx) {
    return this.wrapError(async () => {
      const userInfo = this.getContextBody(ctx);
      const registeredUser = await this.service.register(userInfo);

      return ctx.created(registeredUser);
    }, ctx);
  }

  async login(ctx) {
    return this.wrapError(async () => {
      const userData = this.getContextBody(ctx);
      const loggedUser = await this.service.login(userData);

      return ctx.ok(loggedUser);
    }, ctx);
  }

  async permitAdmin(ctx) {
    return this.wrapError(async () => {
      const userInfo = this.getContextBody(ctx);
      await this.service.permitAdmin(userInfo);

      return ctx.noContent();
    }, ctx);
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
