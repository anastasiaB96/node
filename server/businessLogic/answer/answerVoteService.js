'use strict';

import BaseService from '../helpers/baseService';
import InternalError from '../helpers/errors/internalError';

export default class AnswerVoteService extends BaseService {
  constructor(logger, mapper, answerVoteRepository) {
    super({ logger, mapper, repository: answerVoteRepository });
  }

  async getRating(answerId) {
    try {
      const result = await this.find({ answerId });

      return this.resolve(result ? result.length : 0);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}