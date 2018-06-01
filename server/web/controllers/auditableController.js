'use strict';

import Controller from './controller';
import ROLES from '../../constants/roles';
import { get } from 'lodash';

export default class AuditableController extends Controller {
  async isOwner(ctx) {
    const userId = this.getCurrentUserId(ctx);
    const id = this.getParams(ctx).id;

    return await this.service.isOwner({ userId, id });
  }

  isAdmin(ctx) {
    const userInfo = get(ctx.state, 'jwtData');
    const userRoles = get(userInfo, 'roles');

    return userRoles ? userRoles.includes(ROLES.admin) : false;
  }

  async isPermissions(ctx) {
    return await this.isOwner(ctx) || this.isAdmin(ctx);
  }
}