'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const userInfo = get(ctx.state, 'jwtData');
  const isAdmin = userInfo.roles.includes(ROLES.admin);

  if (isAdmin) {
    return next();
  }

  ctx.forbidden('Sorry, you don\'t have needed permissions!');
};
