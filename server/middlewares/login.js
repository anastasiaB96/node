'use strict';

export default async function login(ctx, next) {
  try {
    const userData = ctx.request.body;
    const authService = ctx.state.container.resolve('authService');
    const loggedUser = await authService.login(userData);

    await next(loggedUser);
  } catch(error) {
    ctx.unauthorized(error);
  }
}
