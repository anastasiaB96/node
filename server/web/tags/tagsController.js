'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from '../helpers/auditableController';
import { createTagValidator, updateTagValidator } from './tagsValidator';

class TagsController extends AuditableController {
  constructor(errorsHelper, tagService) {
    super({ errorsHelper, service: tagService });
  }

  async create(ctx) {
    try {
      const info = this.getContextBody(ctx);
      const userId = this.getCurrentUserId(ctx);
      const createdResult = await this.service.create(userId, info);

      return ctx.created(createdResult);
    } catch (error) {
      return this.throwError(ctx, error);
    }
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
