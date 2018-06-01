'use strict';

import Service from './service';
import ERRORS from '../../constants/errors';

export default class QuestionVoteService extends Service {
  constructor(errorsHelper, logger, mapper, questionVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: questionVoteRepository });
  }

  async getRating(questionId) {
    const result = await this.find({ questionId });

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