'use strict';

export async function login(ctx) {
  const passport = ctx.state.container.resolve('passport');

  return passport.auth('login', (err, user, info) => {
    if (user) {
      ctx.ok(user);
    } else {
      ctx.unauthorized(info);
    }
  })(ctx);
}