'use strict';

import Service from './service';
import ERRORS from '../../constants/errors';

export default class AuditableService extends Service {
  async isOwner({ id, userId }) {
    const info = await this.findById(id);

    if (!info) {
      return this.reject({ errorType: ERRORS.notFound });
    }

    return info.userId === userId;
  }

  async createByUser(userId, info) {
    try {
      const model = { ...info, userId };
      const result = await this.repository.create(model);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}