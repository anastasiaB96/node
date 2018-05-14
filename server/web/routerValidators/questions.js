'use strict';

import validator, { object, array, string, number } from 'koa-context-validator';

export const filterByTagsValidator = validator({
  params: object().keys({
    tags: array().required()
  })
});

export const createQuestionValidator = validator({
  body: object().keys({
    title: string().required(),
    body: string().required()
  })
});

export const updateQuestionValidator = validator({
  body: object().keys({
    title: string(),
    body: string()
  })
});

export const questionTagValidator = validator({
  body: object().keys({
    tagId: number().required()
  })
});