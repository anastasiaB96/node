'use strict';

import BaseService from './baseService';
import ValidationError from './errors/validationError';

export default class AuditableService extends BaseService {
  async isOwner({ id, userId }) {
    return this.wrapError(async () => {
      const info = await this.findById(id);

      if (!info) {
        return Promise.reject(new ValidationError('Invalid user id'));
      }

      return info.userId === userId;
    });
  }
}