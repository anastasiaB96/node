'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';

class TagsController {
  constructor(tagService, logger) {
    this.tagService = tagService;
    this.logger = logger;
  }

  async get(ctx) {
    ctx.ok('TAAAAAGS');
  }
}

export default createController(TagsController)
  .prefix('/tags')
  .get('', 'get', {
    before: [jwtProtection, adminProtection]
  });
