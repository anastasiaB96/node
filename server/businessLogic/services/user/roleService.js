'use strict';

import Service from '../service';

export default class RoleService extends Service {
  constructor(errorsHelper, logger, mapper, roleRepository) {
    super({ errorsHelper, logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    return this.repository.find({ name });
  }
}
