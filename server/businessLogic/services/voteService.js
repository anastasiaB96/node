'use strict';

import Service from './service';
import ERRORS from '../../constants/errors';

export default class VoteService extends Service {
  constructor({ errorsHelper, logger, mapper, repository }) {
    super({ errorsHelper, logger, mapper, repository });
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