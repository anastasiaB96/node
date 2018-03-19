'use strict';

export const login = async (ctx, next) => {
  try {
    const userData = ctx.request.body;
    const authService = ctx.state.container.resolve('authService');
    const loggedUser = await authService.login(userData);

    return next(loggedUser);
  } catch(error) {
    ctx.unauthorized(error);
  }
};
