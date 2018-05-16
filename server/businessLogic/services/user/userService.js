'use strict';

import Service from '../service';
import ROLES from '../../../constants/roles';
import ERRORS from '../../../constants/errors';

export default class UserService extends Service {
  constructor(errorsHelper, logger, mapper, userRepository, roleService) {
    super({ errorsHelper, logger, mapper, repository: userRepository });
    this.roleService = roleService;
  }

  async create(user) {
    try {
      const createdUser = await this.repository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return this.resolve(createdUser);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async findByEmail(email) {
    try {
      return this.repository.findByEmail(email)
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async addRole(user, role) {
    try {
      return this.repository.addRole(user, role);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}
