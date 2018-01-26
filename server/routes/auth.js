'use strict';

import { createController } from 'awilix-koa';

class AuthController {
  constructor(userService) {
    this.userService = userService;
  }

  async signUp(ctx) {
  }

  async signIn(ctx) {
  }
}

export default createController(AuthController)
  .prefix('/auth')
  .post('sign-up', 'signUp')
  .post('sign-in', 'signIn')