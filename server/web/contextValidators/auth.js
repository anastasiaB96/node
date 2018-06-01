'use strict';

import validator, { object, string } from 'koa-context-validator';

export const userRegisterValidator = validator({
  body: object().keys({
    firstName: string().required(),
    lastName: string().required(),
    password: string().required(),
    email: string().required()
  })
});

export const userLoginValidator = validator({
  body: object().keys({
    password: string().required(),
    email: string().required()
  })
});

export const permitAdminValidator = validator({
  body: object().keys({
    email: string().required()
  })
});