"use strict";

import Koa from "koa";

const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello Anastasia";
});

app.listen(3004);
