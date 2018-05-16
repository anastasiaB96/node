'use strict';

import { RateLimit } from 'koa2-ratelimit';

export const rateLimiter  = RateLimit.middleware({
  interval: { min: 15 },
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});