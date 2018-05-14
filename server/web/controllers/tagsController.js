'use strict';

import { createController } from 'awilix-koa';
import { jwtProtection } from '../../middlewares/jwtProtection';
import { adminProtection } from '../../middlewares/adminProtection';
import AuditableController from './auditableController';
import { createTagValidator, updateTagValidator } from '../routerValidators/tags';

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
    before: [createTagValidator, jwtProtection, adminProtection]
  })
  .patch('/:id', 'updateById', {
    before: [updateTagValidator, jwtProtection, adminProtection]
  })
  .delete('/:id', 'deleteById', {
    before: [jwtProtection, adminProtection]
  })
  .delete('', 'deleteAll', {
    before: [jwtProtection, adminProtection]
  });
