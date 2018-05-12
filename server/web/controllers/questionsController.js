'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import VotedItemsController from './votedItemsController';

class QuestionsController extends VotedItemsController {
  constructor(errorsHelper, questionService) {
    super({ errorsHelper, service: questionService });
  }

  async addTag(ctx) {

  }

  async removeTag(ctx) {

  }

  async filterByTags(ctx) {
    const tags = this.getQueryParams(ctx).tags;
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

  async createAnswer(ctx) {
    try {
      const info = {
        ...this.getContextBody(ctx),
        questionId: this.getParams(ctx).id
      };
      const userId = this.getCurrentUserId(ctx);
      const createdAnswer = await this.service.createAnswer(userId, info);

      ctx.created(createdAnswer);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async deleteAllAnswers(ctx) {
    try {
      const questionId = this.getParams(ctx).id;
      await this.service.deleteAllAnswers(questionId);

      ctx.noContent();
    } catch (error) {
      this.throwError(ctx, error);
    }
  }
}

export default createController(QuestionsController)
  .prefix('/questions')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .get('/:id/answers', 'getAnswers')
  .get('/:tags', 'filterByTags')
  .post('', 'createByUser', {
    before: [jwtProtection]
  })
  .post('/:id/answers', 'createAnswer', {
    before: [jwtProtection]
  })
  .patch('/:id', 'updateById', { // return strange data
    before: [jwtProtection]
  })
  .patch('/:id/votes', 'addVote', {
    before: [jwtProtection]
  })
  .patch('/:id/tags', 'addTag', {
    before: [jwtProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/answers', 'deleteAllAnswers', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/votes', 'removeVote', {
    before: [jwtProtection]
  })
  .delete('/:id/tags', 'removeTag', {
    before: [jwtProtection]
  })