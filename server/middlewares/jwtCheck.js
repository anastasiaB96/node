'use strict';

export async function jwtCheck(ctx, next) {
  const passport = ctx.state.container.resolve('passport');

  return passport.auth('jwt', async (err, user) => {
    if (user) {
      await next();
    } else {
      ctx.unauthorized('Unauthorized user');
    }
  } )(ctx, next);
}