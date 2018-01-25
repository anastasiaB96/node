import { createController } from 'awilix-koa';

class TagsController {
  constructor(tagsService, logger) {
    this.tagsService = tagsService;
    this.logger = logger;
  }

  getAll(ctx) {
    ctx.body = this.tagsService.get();
  }
}

export default createController(TagsController)
  .prefix('/tags')
  .get('', 'getAll')