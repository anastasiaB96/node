'use strict';

import Controller from './controller';
import { adminProtection } from '../../middlewares/adminProtection';

export default class AuditableController extends Controller {
  async isOwner(ctx) {
    const userId = this.getLoggedUserId(ctx);
    const id = this.getParams(ctx).id;

    return await this.service.isOwner({ userId, id });
  }

  isAdmin(ctx) {
    let isAdmin = false;
    adminProtection(ctx, () => { isAdmin = true; });

    return isAdmin;
  }

  async isAdminOrOwnerPermissions(ctx) {
    return await this.isOwner(ctx) || this.isAdmin(ctx);
  }

  async updateById(ctx) {
    if (!await this.isAdminOrOwnerPermissions(ctx)) {
      ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    await super.updateById(ctx);
  }

  async deleteById(ctx) {
    if (!await this.isAdminOrOwnerPermissions(ctx)) {
      ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    await super.deleteById(ctx);
  }
}