'use strict';

import BaseService from './baseService';
import InternalError from './errors/internalError';
import BadRequestError from './errors/badRequestError';

export default class AuditableService extends BaseService {
  async isOwner({ id, userId }) {
    return this.wrapError(async () => {
      const info = await this.findById(id);

      if (!info) {
        return Promise.reject(new BadRequestError('User wasn\'t found'));
      }

      return info.userId === userId;
    });
  }
}