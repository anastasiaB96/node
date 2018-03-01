'use strict';

import jwt from 'koa-jwt';
import config from 'config';

export const jwtProtection = jwt({
  secret: config.get('auth.secret'),
  key: 'jwtData'
});
