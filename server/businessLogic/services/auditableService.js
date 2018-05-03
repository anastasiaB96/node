'use strict';

import Service from './service';

export default class AuditableService extends Service {
  async isOwner({ id, userId }) {
    const info = await this.findById(id);

    return info.userId === userId;
  }
}