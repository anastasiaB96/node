'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class QuestionsController extends BaseController {
  constructor(logger, questionService) {
    super(logger, questionService);
  }

  async filterByTags() {

  }

  async getAnswers() {

  }

  async create(ctx) {
    try {
      const questionInfo = BaseController.getContextBody(ctx);
      const userId = BaseController.getLoggedUserId(ctx);
      const createdQuestion = await this.service.create({ userId, questionInfo });

      ctx.created(createdQuestion);
    } catch (error) {
      ctx.forbidden(error);
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
      ctx.forbidden(error);
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
  .get('', 'filterByTags')
  .get('/:id/answers', 'getAnswers')
  .before([jwtProtection])
  .post('', 'create')
  .post('/:id/answers', 'createAnswer')
  .patch('/:id', 'update')
  .delete('', 'deleteAll', {
    before: [adminProtection]
  })
  .delete('/:id', 'deleteById')
  .delete('/:id/answers', 'deleteAllAnswers', {
    before: [adminProtection]
  })