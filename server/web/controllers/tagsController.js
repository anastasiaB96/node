'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import BaseController from './baseController';

class TagsController extends BaseController {
  constructor(logger, tagService) {
    super(logger, tagService);
  }

  update() {

  }
}

export default createController(TagsController)
  .prefix('/tags')
  .get('', 'getAll')
  .before([jwtProtection])
  .post('', 'create')
  .patch('/:id', 'update')
  .delete('', 'deleteAll', {
    before: [adminProtection]
  })
  .delete('/:id', 'deleteById');
