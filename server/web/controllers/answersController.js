'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';

class AnswersController {
  constructor(logger, answerService) {
    this.logger = logger;
    this.answerService = answerService;
  }

  getAll() {

  }

  getById() {

  }

  create() {

  }

  update() {

  }

  deleteAll() {

  }

  delete() {

  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .post('', 'create', {
    before: [jwtProtection]
  })
  .put('/:id', 'update', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id', 'delete', {
    before: [jwtProtection]
  })