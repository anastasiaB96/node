'use strict';

import Service from '../service';
import ERRORS from '../../../constants/errors';

export default class RoleService extends Service {
  constructor(errorsHelper, logger, mapper, roleRepository) {
    super({ errorsHelper, logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    try {
      const result = await this.repository.find({ name });

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}
