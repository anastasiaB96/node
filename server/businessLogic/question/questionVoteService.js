'use strict';

import BaseService from '../helpers/baseService';
import ERRORS from '../../constants/errors';

export default class QuestionVoteService extends BaseService {
  constructor(errorsHelper, logger, mapper, questionVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: questionVoteRepository });
  }

  async getRating(questionId) {
    try {
      const result = await this.find({ questionId });

      return this.resolve(result ? result.length : 0);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
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