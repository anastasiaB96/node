'use strict';

import Service from './service';
import ERRORS from '../../constants/errors';

export default class AnswerVoteService extends Service {
  constructor(errorsHelper, logger, mapper, answerVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: answerVoteRepository });
  }

  async getRating(answerId) {
    const result = await this.find({ answerId });

    return result ? result.length : 0;
  }

  async create(info) {
    try {
      return this.repository.create(info);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async delete(info) {
    try {
      return this.repository.delete(info);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}