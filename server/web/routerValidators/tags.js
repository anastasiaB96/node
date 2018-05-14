'use strict';

import validator, { object, string } from 'koa-context-validator';

export const createTagValidator = validator({
  body: object().keys({
    name: string().required()
  })
});

export const updateTagValidator = validator({
  body: object().keys({
    name: string()
  })
});