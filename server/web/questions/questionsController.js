'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from '../helpers/auditableController';
import {
  filterByTagsValidator, createQuestionValidator, updateQuestionValidator, questionTagValidator, createAnswerValidator
} from './questionsValidator';

class QuestionsController extends AuditableController {
  constructor(questionService) {
    super(questionService);
  }

  async filterByTagIds(ctx) {
    return this.wrapError(async () => {
      const searchInfo = this.getQueryParams(ctx).id;
      const filteredResult = await this.service.filterByTags(searchInfo);

      return ctx.ok(filteredResult);
    }, ctx);
  }

  async getAnswers(ctx) {
    return this.wrapError(async () => {
      const questionId = this.getParams(ctx).id;
      const answers = await this.service.getAnswers(questionId);

      return ctx.ok(answers);
    }, ctx);
  }

  async create(ctx) {
    return this.wrapError(async () => {
      const questionInfo = this.getContextBody(ctx);
      const userId = this.getCurrentUserId(ctx);
      const createdResult = await this.service.create({ userId, ...questionInfo });

      return ctx.created(createdResult);
    }, ctx);
  }

  async createAnswer(ctx) {
    return this.wrapError(async () => {
      const info = {
        ...this.getContextBody(ctx),
        questionId: this.getParams(ctx).id,
        userId: this.getCurrentUserId(ctx)
      };
      const createdAnswer = await this.service.createAnswer(info);

      return ctx.created(createdAnswer);
    }, ctx);
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
      const questionId = this.getParams(ctx).id;

      await this.service.addVote({ userId, questionId });

      return ctx.noContent();
    }, ctx);
  }

  async addTag(ctx) {
    return this.wrapError(async () => {
      const questionId = this.getParams(ctx).id;
      const tagId = this.getContextBody(ctx).tagId;
      await this.service.addTagToQuestion({ questionId, tagId });

      return ctx.noContent();
    }, ctx);
  }

  async deleteById(ctx) {
    if (!await this.isPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.deleteById(ctx);
  }

  async deleteAllAnswers(ctx) {
    return this.wrapError(async () => {
      const questionId = this.getParams(ctx).id;

      await this.service.deleteAllAnswers(questionId);

      return ctx.noContent();
    }, ctx);
  }

  async removeVote(ctx) {
    return this.wrapError(async () => {
      const userId = this.getCurrentUserId(ctx);
      const questionId = this.getParams(ctx).id;

      await this.service.removeVote({ userId, questionId });

      return ctx.noContent();
    }, ctx);
  }

  async removeTag(ctx) {
    return this.wrapError(async () => {
      const questionId = this.getParams(ctx).id;
      const tagId = this.getContextBody(ctx).tagId;
      await this.service.removeTagFromQuestion({ questionId, tagId });

      return ctx.noContent();
    }, ctx);
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