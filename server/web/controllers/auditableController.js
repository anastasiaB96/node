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

  async isAdminOrOwnerPermissions(ctx) {
    return await this.isOwner(ctx) || this.isAdmin(ctx);
  }

  async createByUser(ctx) {
    try {
      const contextBody = this.getContextBody(ctx);
      const userId = this.getCurrentUserId(ctx);
      const createdResult = await this.service.createByUser(userId, contextBody);

      return ctx.created(createdResult);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async updateById(ctx) {
    if (!await this.isAdminOrOwnerPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.updateById(ctx);
  }

  async deleteById(ctx) {
    if (!await this.isAdminOrOwnerPermissions(ctx)) {
      return ctx.forbidden('Sorry, you don\'t have requested permissions!');
    }

    return super.deleteById(ctx);
  }
}