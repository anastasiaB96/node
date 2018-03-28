'use strict';

import BaseService from '../baseService';

export default class RoleService extends BaseService {
  constructor(mapper, roleRepository) {
    super(mapper, roleRepository);
  }

  async findByName(name) {
    return this.repository.find({ name });
  }
}
