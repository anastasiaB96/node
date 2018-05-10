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
}