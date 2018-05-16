'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';

export default class QuestionService extends AuditableService {
  constructor(errorsHelper, logger, mapper, questionRepository, answerService, userService, questionVoteService, tagService) {
    super({ errorsHelper, logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.userService = userService;
    this.questionVoteService = questionVoteService;
    this.tagService = tagService;
  }

  async addTagToQuestion(questionId, tagId) {
    try {
      const tag = await this.tagService.findById(tagId);
      const question = await this.repository.findById(questionId);

      if (!tag) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown tag id.' });
      }

      if (!question) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown question id.' });
      }

      return this.repository.addTagToQuestion(question, tag);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async removeTagFromQuestion(questionId, tagId) {
    try {
      const tag = await this.tagService.findById(tagId);
      const question = await this.repository.findById(questionId);

      if (!tag) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown tag id.' });
      }

      if (!question) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown question id.' });
      }

      return this.repository.removeTagFromQuestion(question, tag);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async filterByTags(searchInfo) {
    try {
      return this.repository.filterByTags(searchInfo);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async createAnswer(userId, info) {
    try {
      return this.answerService.createByUser(userId, info);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async getAnswers(questionId) {
    try {
      return this.answerService.find({ questionId });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteAllAnswers(questionId) {
    try {
      return this.answerService.delete({ questionId });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async addVote(userId, questionId) {
    const info = { userId, questionId };

    return this.questionVoteService.create(info);
  }

  async removeVote(userId, questionId) {
    const info = { userId, questionId };

    return this.questionVoteService.delete(info);
  }
}