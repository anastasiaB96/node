'use strict';

import BaseController from './baseController';
import ROLES from '../../constants/roles';
import { get } from 'lodash';

export default class AuditableController extends BaseController {
  isAdmin(ctx) {
    const userInfo = get(ctx.state, 'jwtData');
    const userRoles = get(userInfo, 'roles');

    return userRoles ? userRoles.includes(ROLES.admin) : false;
  }

  async isOwner(ctx) {
    const userId = this.getCurrentUserId(ctx);
    const id = this.getParams(ctx).id;

    return await this.service.isOwner({ userId, id });
  }

  async isPermissions(ctx) {
    return this.isAdmin(ctx) || await this.isOwner(ctx);
  }
}