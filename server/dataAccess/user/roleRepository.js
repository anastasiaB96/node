'use strict';

import BaseRepository from '../helpers/baseRepository';

export default class RoleRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Role' });
  }
}
