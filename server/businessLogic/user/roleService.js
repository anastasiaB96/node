'use strict';

import BaseService from '../helpers/baseService';
import InternalError from '../helpers/errors/internalError';

export default class RoleService extends BaseService {
  constructor(logger, mapper, roleRepository) {
    super({ logger, mapper, repository: roleRepository });
  }

  async findByName(name) {
    try {
      return this.repository.find({ name });
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}
