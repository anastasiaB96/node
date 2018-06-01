'use strict';

import Controller from './controller';
import { adminProtection } from '../../middlewares/adminProtection';

export default class AuditableController extends Controller {
  async isOwner(ctx) {
    const userId = this.getCurrentUserId(ctx);
    const id = this.getParams(ctx).id;

    return await this.service.isOwner({ userId, id });
  }

  isAdmin(ctx) {
    let isAdmin = false;
    adminProtection(ctx, () => { isAdmin = true; });

    return isAdmin;
  }

  async isPermissions(ctx) {
    return await this.isOwner(ctx) || this.isAdmin(ctx);
  }
}