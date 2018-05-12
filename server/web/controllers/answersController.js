'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from './auditableController';

class AnswersController extends AuditableController {
  constructor(errorsHelper, answerService) {
    super({ errorsHelper, service: answerService });
  }

  async addVote(ctx) {
    try {
      const answerId = this.getParams(ctx).id;
      const userId = this.getCurrentUserId(ctx);
      await this.service.addVote(userId, answerId);

      ctx.noContent();
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async removeVote(ctx) {
    try {
      const answerId = this.getParams(ctx).id;
      const userId = this.getCurrentUserId(ctx);
      await this.service.removeVote(userId, answerId);

      ctx.noContent();
    } catch (error) {
      this.throwError(ctx, error);
    }
  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('/:id', 'getById')
  .patch('/:id', 'updateById', {
    before: [jwtProtection]
  })
  .patch('/:id/rating', 'addVote', {
    before: [jwtProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/rating', 'removeVote', {
    before: [jwtProtection]
  })