'use strict';

import { createController } from 'awilix-koa';
import { jwtCheck } from '../middlewares/jwtCheck';

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
    before: [jwtCheck]
  });
