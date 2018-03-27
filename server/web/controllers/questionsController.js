'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';

class QuestionsController {
  constructor(logger, questionService) {
    this.logger = logger;
    this.questionService = questionService;
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

export default createController(QuestionsController)
  .prefix('/questions')
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