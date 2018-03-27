'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class TagsController extends BaseController {
  constructor(tagService, logger) {
    super(logger);
    this.tagService = tagService;
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
