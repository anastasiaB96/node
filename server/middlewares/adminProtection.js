'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const userInfo = get(ctx.state, 'jwtData');
  const isAdmin = userInfo.roles ? userInfo.roles.includes(ROLES.admin) : false;

  if (!isAdmin) {
    return ctx.forbidden('Sorry, you don\'t have requested permissions!');
  }

  return next();
};
