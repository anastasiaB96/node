'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import { createTagValidator, updateTagValidator } from './tagsValidator';
import BaseController from '../helpers/baseController';

class TagsController extends BaseController {
  constructor(tagService) {
    super(tagService);
  }

  async create(ctx) {
    return this.wrapError(async () => {
      const tagInfo = this.getContextBody(ctx);
      const userId = this.getCurrentUserId(ctx);
      const createdResult = await this.service.create({ userId, ...tagInfo });

      return ctx.created(createdResult);
    }, ctx);
  }
}

export default createController(TagsController)
  .prefix('/tags')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .post('', 'create', {
    before: [createTagValidator, jwtProtection, adminProtection]
  })
  .patch('/:id', 'updateById', {
    before: [updateTagValidator, jwtProtection, adminProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection, adminProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  });
