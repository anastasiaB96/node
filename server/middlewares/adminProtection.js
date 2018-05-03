'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const userInfo = get(ctx.state, 'jwtData');
  const isAdmin = userInfo.roles.includes(ROLES.admin);

  if (!isAdmin) {
    ctx.forbidden('Sorry, you don\'t have requested permissions!');
  }

  return next();
};
