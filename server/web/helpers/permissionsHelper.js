'use strict';

import { get } from 'lodash';
import ROLES from '../../constants/roles';

export default class PermissionsHelper {
  async isOwnerOrAdmin(userInfo, getEntity, getOwnerId) {
    if (!userInfo) {
      return false;
    }

    const entity = await getEntity();
    const entityOwnerId = getOwnerId(entity);

    const userId = userInfo.id;
    const userRoles = get(userInfo, 'roles');
    const isAdmin = userRoles ? userRoles.includes(ROLES.admin) : false;

    return isAdmin || (entityOwnerId === userId);
  }
}
