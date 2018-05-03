'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from './auditableController';

class QuestionsController extends AuditableController {
  constructor(errorsHelper, questionService) {
    super({ errorsHelper, service: questionService });
  }

  async filterByTags() {

  }

  async getAnswers(ctx) {
    try {
      const questionId = this.getParams(ctx).id;
      const answers = await this.service.getAnswers(questionId);

      ctx.ok(answers);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async create(ctx) {
    try {
      const questionInfo = this.getContextBody(ctx);
      const userId = this.getLoggedUserId(ctx);
      const createdQuestion = await this.service.create({ userId, questionInfo });

      ctx.created(createdQuestion);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async createAnswer(ctx) {
    try {
      const answerInfo = this.getContextBody(ctx);
      const questionId = this.getParams(ctx).id;
      const userId = this.getLoggedUserId(ctx);
      const createdAnswer = await this.service.createAnswer({ userId, questionId, answerInfo });

      ctx.created(createdAnswer);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async deleteAllAnswers() {

  }
}

export default createController(QuestionsController)
  .prefix('/questions')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .get('/:id/answers', 'getAnswers')
  .post('', 'create', {
    before: [jwtProtection]
  })
  .post('/:id/answers', 'createAnswer', {
    before: [jwtProtection]
  })
  .patch('/:id', 'updateById', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection]
  })
  .delete('/:id/answers', 'deleteAllAnswers', {
    before: [jwtProtection, adminProtection]
  })