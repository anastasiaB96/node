'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import { updateAnswerValidator } from './answersValidator';
import BaseController from '../helpers/baseController';

class AnswersController extends BaseController {
  constructor(answerService, permissionsHelper) {
    super(answerService);

    this.permissionsHelper = permissionsHelper;
  }

  async updateById(ctx) {
    if (!await this._isOwnerOrAdmin(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.updateById(ctx);
  }

  async addVote(ctx) {
    return this.wrapError(async () => {
      const userId = this.getCurrentUserId(ctx);
      const answerId = this.getParams(ctx).id;

      await this.service.addVote({ userId, answerId });

      return ctx.noContent();
    }, ctx);
  }

  async deleteById(ctx) {
    if (!await this._isOwnerOrAdmin(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.deleteById(ctx);
  }

  async removeVote(ctx) {
    return this.wrapError(async () => {
      const userId = this.getCurrentUserId(ctx);
      const answerId = this.getParams(ctx).id;

      await this.service.removeVote({ userId, answerId });

      return ctx.noContent();
    }, ctx);
  }

  async _isOwnerOrAdmin(ctx) {
    const userInfo = this.getCurrentUser(ctx);
    const answerId = this.getParams(ctx).id;

    return await this.permissionsHelper.isOwnerOrAdmin(
      userInfo,
      async () => await this.service.findById(answerId),
      (entity) => entity.userId
    )
  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('/:id', 'getById')
  .patch('/:id', 'updateById', {
    before: [updateAnswerValidator, jwtProtection]
  })
  .patch('/:id/votes', 'addVote', {
    before: [jwtProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/votes', 'removeVote', {
    before: [jwtProtection]
  })