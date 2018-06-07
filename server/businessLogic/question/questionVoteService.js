'use strict';

import BaseService from '../helpers/baseService';
import InternalError from '../helpers/errors/internalError';

export default class QuestionVoteService extends BaseService {
  constructor(logger, mapper, questionVoteRepository) {
    super({ logger, mapper, repository: questionVoteRepository });
  }

  async getRating(questionId) {
    try {
      const result = await this.find({ questionId });

      return this.resolve(result ? result.length : 0);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}