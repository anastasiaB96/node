'use strict';

import Service from '../service';
import ERRORS from '../../../constants/errors';

export default class RoleService extends Service {
  constructor(errorsHelper, logger, mapper, roleRepository) {
    super({ errorsHelper, logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    try {
      return this.repository.find({ name });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}
