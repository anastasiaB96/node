'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from '../helpers/auditableController';
import { createTagValidator, updateTagValidator } from './tagsValidator';

class TagsController extends AuditableController {
  constructor(tagService, promiseService) {
    super(tagService, promiseService);
  }

  async create(ctx) {
    return this.promiseService.wrapError(async () => {
      const tagInfo = this.getContextBody(ctx);
      const userId = this.getCurrentUserId(ctx);
      const createdResult = await this.service.create({ userId, ...tagInfo });

      return ctx.created(createdResult);
    }, ctx);
  }

  async updateById(ctx) {
    if (!await this.isPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.updateById(ctx);
  }

  async deleteById(ctx) {
    if (!await this.isPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.deleteById(ctx);
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
