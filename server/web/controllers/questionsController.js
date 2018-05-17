'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import VotedItemsController from './votedItemsController';
import { filterByTagsValidator, createQuestionValidator, updateQuestionValidator, questionTagValidator } from '../routerValidators/questions';
import { createAnswerValidator } from '../routerValidators/answers';

class QuestionsController extends VotedItemsController {
  constructor(errorsHelper, questionService) {
    super({ errorsHelper, service: questionService });
  }

  async addTag(ctx) {
    try {
      const tagId = this.getContextBody(ctx).tagId;
      const questionId = this.getParams(ctx).id;
      await this.service.addTagToQuestion(questionId, tagId);

      ctx.noContent();
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async removeTag(ctx) {
    try {
      const tagId = this.getContextBody(ctx).tagId;
      const questionId = this.getParams(ctx).id;
      await this.service.removeTagFromQuestion(questionId, tagId);

      ctx.noContent();
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async filterByTagIds(ctx) {
    try {
      const searchInfo = this.getQueryParams(ctx).id;
      const filteredResult = await this.service.filterByTags(searchInfo);

      ctx.ok(filteredResult);
    } catch (error) {
      this.throwError(ctx, error);
    }
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
  .get('/tags', 'filterByTagIds', {
    before: [filterByTagsValidator]
  })
  .get('/:id', 'getById')
  .get('/:id/answers', 'getAnswers')
  .post('', 'createByUser', {
    before: [createQuestionValidator, jwtProtection]
  })
  .post('/:id/answers', 'createAnswer', {
    before: [createAnswerValidator, jwtProtection]
  })
  .patch('/:id', 'updateById', {
    before: [updateQuestionValidator, jwtProtection]
  })
  .patch('/:id/votes', 'addVote', {
    before: [jwtProtection]
  })
  .patch('/:id/tags', 'addTag', {
    before: [questionTagValidator, jwtProtection, adminProtection]
  })
  .delete('/:id', 'm ', {
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
    before: [questionTagValidator, jwtProtection, adminProtection]
  })