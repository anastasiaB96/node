'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const userInfo = get(ctx, 'state.jwtData');
  const roleName = get(userInfo.role[0], 'name');

  if (roleName !== ROLES.admin) {
    ctx.forbidden('Sorry, you don\'t have needed permissions!');
  }

  return next();
};
