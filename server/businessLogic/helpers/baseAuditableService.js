'use strict';

import BaseService from './baseService';
import InternalError from './errors/internalError';
import BadRequestError from './errors/badRequestError';

export default class BaseAuditableService extends BaseService {
  async isOwner({ id, userId }) {
    try {
      const info = await this.findById(id);

      if (!info) {
        return this.reject(new BadRequestError('User wasn\'t found'));
      }

      return info.userId === userId;
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}