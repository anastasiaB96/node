'use strict';

import { get } from 'lodash';
import ROLES from '../constants/roles';

export const adminProtection = (ctx, next) => {
  const role = get(ctx, 'state.jwtData');
  console.log(get(ctx, 'state.jwtData'));

  return next();
};
