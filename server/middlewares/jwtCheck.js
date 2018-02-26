'use strict';

export async function jwtCheck(ctx, next) {
  const passport = ctx.state.container.resolve('passport');

  await passport.auth('jwt', async (err, user) => {
    console.log(user);
    if (user) {
      next();
    } else {
      ctx.unauthorized('No such user');
    }
  } )(ctx, next);
}