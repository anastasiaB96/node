'use strict';

import Repository from '../repository';

export default class RoleRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Role' });
  }
}
