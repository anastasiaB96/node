'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from './auditableController';

class TagsController extends AuditableController {
  constructor(errorsHelper, tagService) {
    super({ errorsHelper, service: tagService });
  }
}

export default createController(TagsController)
  .prefix('/tags')
  .get('', 'getAll')
  .get('/:id', 'getById')
  .post('', 'createByUser', {
    before: [jwtProtection, adminProtection]
  })
  .patch('/:id', 'updateById', {
    before: [jwtProtection, adminProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection, adminProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  });
