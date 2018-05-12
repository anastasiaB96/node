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

      await this.repository.addTagToQuestion(question, tag);

      return this.resolve();
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

      await this.repository.removeTagFromQuestion(question, tag);

      return this.resolve();
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async filterByTags(searchInfo) {
    try {
      const filteredResult = await this.repository.filterByTags(searchInfo);

      return this.resolve(filteredResult);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async createAnswer(userId, info) {
    try {
      const createdAnswer = await this.answerService.createByUser(userId, info);

      return this.resolve(createdAnswer);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async getAnswers(questionId) {
    try {
      const answers = await this.answerService.find({ questionId });

      return this.resolve(answers);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteAllAnswers(questionId) {
    try {
      const result = await this.answerService.delete({ questionId });

      return this.resolve(result);
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