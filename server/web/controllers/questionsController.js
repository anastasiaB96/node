'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class QuestionsController extends BaseController {
  constructor(errorsHelper, questionService) {
    super({ errorsHelper, service: questionService });
  }

  async filterByTags() {

  }

  async getAnswers(ctx) {
    try {
      const questionId = BaseController.getParams(ctx).id;
      const answers = await this.service.getAnswers(questionId);

      ctx.ok(answers);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async create(ctx) {
    try {
      const questionInfo = BaseController.getContextBody(ctx);
      const userId = BaseController.getLoggedUserId(ctx);
      const createdQuestion = await this.service.create({ userId, questionInfo });

      ctx.created(createdQuestion);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async createAnswer(ctx) {
    try {
      const answerInfo = BaseController.getContextBody(ctx);
      const questionId = BaseController.getParams(ctx).id;
      const userId = BaseController.getLoggedUserId(ctx);
      const createdAnswer = await this.service.createAnswer({ userId, questionId, answerInfo });

      ctx.created(createdAnswer);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async update() {

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
  .patch('/:id', 'update', {
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