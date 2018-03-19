'use strict';

import BaseRepository from '../baseRepository';

export default class RoleRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super(logger, dbContext, 'Role');
  }
}
