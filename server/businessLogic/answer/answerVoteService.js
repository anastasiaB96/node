'use strict';

import BaseService from '../helpers/baseService';
import ERRORS from '../../constants/errors';

export default class AnswerVoteService extends BaseService {
  constructor(errorsHelper, logger, mapper, answerVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: answerVoteRepository });
  }

  async getRating(answerId) {
    try {
      const result = await this.find({ answerId });

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