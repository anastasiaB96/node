'use strict';

import BaseService from '../baseService';
import ROLES from '../../../constants/roles';

export default class UserService extends BaseService {
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
      return this.reject(this.errorsHelper.createInternalServerError());
    }
  }

  async findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  async addRole(user, role) {
    return this.repository.addRole(user, role);
  }
}
