'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../middlewares/jwtProtection';
import { adminProtection } from '../middlewares/adminProtection';

class TagController {
  constructor(tagService, logger) {
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
    before: [jwtProtection, adminProtection]
  });
