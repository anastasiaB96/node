'use strict';

import { createController } from 'awilix-koa';
import { jwtCheck } from '../middlewares/jwtCheck';

class TagController {
  constructor(passport, tagService, logger) {
    this.passport = passport;
    this.tagService = tagService;
    this.logger = logger;
  }

  async getAll(ctx) {
    ctx.ok('TAAAAAGS');
  }
}

export default createController(TagController)
  .prefix('/tag')
  .get('', 'getAll', {
    before: [jwtCheck]
  });
