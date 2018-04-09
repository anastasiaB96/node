'use strict';

import BaseService from '../baseService';

export default class RoleService extends BaseService {
  constructor(errorsHelper, logger, mapper, roleRepository) {
    super({ errorsHelper, logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    return this.repository.find({ name });
  }
}
