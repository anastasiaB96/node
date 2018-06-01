'use strict';

import validator, { object, string } from 'koa-context-validator';

export const createAnswerValidator = validator({
  body: object().keys({
    body: string().required()
  })
});

export const updateAnswerValidator = validator({
  body: object().keys({
    body: string()
  })
});