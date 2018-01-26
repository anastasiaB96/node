'use strict';

import logger from '../libs/logger';

export async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || 500;
    ctx.body = err.toJSON ? err.toJSON() : { message: err.message, ...err };

    logger.error('Error in request', err);
  }
}