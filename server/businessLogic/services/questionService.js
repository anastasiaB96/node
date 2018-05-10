'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';

export default class QuestionService extends AuditableService {
  constructor(errorsHelper, logger, mapper, questionRepository, answerService, userService, questionRatingService) {
    super({ errorsHelper, logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.userService = userService;
    this.questionRatingService = questionRatingService;
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

  async addRating(userId, questionId) {
    return this.questionRatingService.create(userId, questionId);
  }

  async removeRating(userId, questionId) {
    return this.questionRatingService.delete(userId, questionId);
  }
}