'use strict';

import { createController } from 'awilix-koa';

class TagController {
  constructor(tagService, logger) {
    this.tagService = tagService;
    this.logger = logger;
  }

  async getAll(ctx) {
    ctx.ok(await this.tagService.getAll());
  }
}

export default createController(TagController)
  .prefix('/tag')
  .get('', 'getAll')