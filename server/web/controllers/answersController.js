'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class AnswersController extends BaseController {
  constructor(logger, answerService) {
    super(logger);
    this.answerService = answerService;
  }

  getById() {

  }

  update() {

  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('/:id', 'getById')
  .put('/:id', 'update', {
    before: [jwtProtection]
  })