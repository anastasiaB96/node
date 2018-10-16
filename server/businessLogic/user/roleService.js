'use strict';

import BaseService from '../helpers/baseService';

export default class RoleService extends BaseService {
  constructor(mapper, roleRepository) {
    super({ mapper, repository: roleRepository });
  }

  async findByName(name) {
    return this.wrapError(async () => {
      return this.repository.find({ name });
    });
  }
}
