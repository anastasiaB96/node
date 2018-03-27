'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class QuestionsController extends BaseController {
  constructor(logger, questionService) {
    super(logger);
    this.questionService = questionService;
  }

  getAll() {

  }

  getById() {

  }

  filter() {

  }

  create() {

  }

  update() {

  }

  deleteAll() {

  }

  delete() {

  }

  getAnswers() {

  }

  createAnswer() {

  }

  deleteAllAnswers() {

  }
}

export default createController(QuestionsController)
  .prefix('/questions')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .get('', 'filter')
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
  .get('/:id/answers', 'getAnswers')
  .post('/:id/answers', 'createAnswer', {
    before: [jwtProtection]
  })
  .delete('/:id/answers', 'deleteAllAnswers', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/answers/:id', 'deleteAnswer', {
    before: [jwtProtection]
  })