'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from '../helpers/auditableController';
import {
  filterByTagsValidator, createQuestionValidator, updateQuestionValidator, questionTagValidator, createAnswerValidator
} from './questionsValidator';

class QuestionsController extends AuditableController {
  constructor(errorsHelper, questionService) {
    super({ errorsHelper, service: questionService });
  }

  async filterByTagIds(ctx) {
    try {
      const searchInfo = this.getQueryParams(ctx).id;
      const filteredResult = await this.service.filterByTags(searchInfo);

      return ctx.ok(filteredResult);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async getAnswers(ctx) {
    try {
      const questionId = this.getParams(ctx).id;
      const answers = await this.service.getAnswers(questionId);

      return ctx.ok(answers);
    } catch (error) {
      return this.throwError(ctx, error);
    }
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

  async createAnswer(ctx) {
    try {
      const info = {
        ...this.getContextBody(ctx),
        questionId: this.getParams(ctx).id
      };
      const userId = this.getCurrentUserId(ctx);
      const createdAnswer = await this.service.createAnswer(userId, info);

      return ctx.created(createdAnswer);
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

  async addVote(ctx) {
    try {
      const userId = this.getCurrentUserId(ctx);
      const questionId = this.getParams(ctx).id;

      await this.service.addVote(userId, questionId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async addTag(ctx) {
    try {
      const questionId = this.getParams(ctx).id;
      const tagId = this.getContextBody(ctx).tagId;
      await this.service.addTagToQuestion(questionId, tagId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async deleteById(ctx) {
    if (!await this.isPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.deleteById(ctx);
  }

  async deleteAllAnswers(ctx) {
    try {
      const questionId = this.getParams(ctx).id;

      await this.service.deleteAllAnswers(questionId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async removeVote(ctx) {
    try {
      const userId = this.getCurrentUserId(ctx);
      const questionId = this.getParams(ctx).id;

      await this.service.removeVote(userId, questionId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async removeTag(ctx) {
    try {
      const questionId = this.getParams(ctx).id;
      const tagId = this.getContextBody(ctx).tagId;
      await this.service.removeTagFromQuestion(questionId, tagId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
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
  .post('', 'create', {
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
    before: [questionTagValidator, jwtProtection, adminProtection]
  })