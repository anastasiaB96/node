'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class AnswersController extends BaseController {
  constructor(logger, answerService) {
    super(logger, answerService);
  }

  update() {

  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('/:id', 'getById')
  .before([jwtProtection])
  .patch('/:id', 'update')
  .delete('', 'deleteAll', {
    before: [adminProtection]
  })
  .delete('/:id', 'deleteById')