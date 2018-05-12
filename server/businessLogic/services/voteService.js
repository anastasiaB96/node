'use strict';

import Service from './service';
import ERRORS from '../../constants/errors';

export default class VoteService extends Service {
  constructor({ errorsHelper, logger, mapper, repository }) {
    super({ errorsHelper, logger, mapper, repository });
  }

  async create(info) {
    try {
      await this.repository.create(info);

      return this.resolve();
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async delete(info) {
    try {
      await this.repository.delete(info);

      return this.resolve();
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}