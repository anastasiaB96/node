'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from '../helpers/auditableController';
import { updateAnswerValidator } from './answersValidator';

class AnswersController extends AuditableController {
  constructor(answerService) {
    super(answerService);
  }

  async updateById(ctx) {
    if (!await this.isPermissions(ctx)) {
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
    if (!await this.isPermissions(ctx)) {
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