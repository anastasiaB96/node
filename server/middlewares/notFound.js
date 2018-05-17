'use strict';

export const notFoundHandler = async (ctx) => {
  const msg = `${ctx.request.method} ${ctx.request.path}`;

  ctx.notFound({
    message: `No endpoint matched your request: ${msg}`
  });
};
