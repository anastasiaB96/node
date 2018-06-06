'use strict';

import validator, { object, string } from 'koa-context-validator';

export const updateAnswerValidator = validator({
  body: object().keys({
    body: string()
  })
});