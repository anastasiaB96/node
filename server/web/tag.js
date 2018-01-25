import { createController } from 'awilix-koa';

class TagController {
  constructor(tagService, logger) {
    this.tagService = tagService;
    this.logger = logger;
  }

  getAll(ctx) {
    console.log(this.tagService);
    ctx.ok(this.tagService.getAll());
  }
}

export default createController(TagController)
  .prefix('/tag')
  .get('', 'getAll')