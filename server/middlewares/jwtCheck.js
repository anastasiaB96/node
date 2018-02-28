'use strict';

import jwt from 'koa-jwt';
import config from 'config';

export const jwtCheck = jwt({
  secret: config.get('auth.secret')
});
