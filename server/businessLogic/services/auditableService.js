'use strict';

import Service from './service';

export default class AuditableService extends Service {
  async isOwner(id, userId) {
    const essence = await this.findById(id);

    return essence.userId === userId;
  }
}