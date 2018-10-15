'use strict';

import BaseService from '../helpers/baseService';

export default class RoleService extends BaseService {
  constructor(logger, mapper, roleRepository) {
    super({ logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    return this.wrapError(async () => {
      return this.repository.find({ name });
    });
  }
}
