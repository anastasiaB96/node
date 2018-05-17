'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const userInfo = get(ctx.state, 'jwtData');
  const userRoles = get(userInfo, 'roles');
  const isAdmin = userRoles ? userRoles.includes(ROLES.admin) : false;

  if (!isAdmin) {
    return ctx.forbidden('Sorry, you don\'t have requested permissions!');
  }

  return next();
};