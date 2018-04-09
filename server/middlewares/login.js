'use strict';

export const login = async (ctx, next) => {
  const authService = ctx.state.container.resolve('authService');
  const errorsHelper = ctx.state.container.resolve('errorsHelper');

  try {
    const userData = ctx.request.body;
    const loggedUser = await authService.login(userData);

    return next(loggedUser);
  } catch (errorName) {
    const error = errorsHelper.getHttpErrorInfo(errorName);
    ctx.send(error.code, error.userMessage);
  }
};
