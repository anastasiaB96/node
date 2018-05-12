'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import VotedItemsController from './votedItemsController';

class AnswersController extends VotedItemsController {
  constructor(errorsHelper, answerService) {
    super({ errorsHelper, service: answerService });
  }
}

export default createController(AnswersController)
  .prefix('/answers')
  .get('/:id', 'getById')
  .patch('/:id', 'updateById', {
    before: [jwtProtection]
  })
  .patch('/:id/vote', 'addVote', {
    before: [jwtProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id/vote', 'removeVote', {
    before: [jwtProtection]
  })