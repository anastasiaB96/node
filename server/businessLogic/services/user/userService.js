'use strict';

import BaseService from '../baseService';
import ROLES from '../../../constants/roles';

export default class UserService extends BaseService {
  constructor(mapper, userRepository, roleService) {
    super(mapper, userRepository);
    this.roleService = roleService;
  }

  async create(user) {
    try {
      const createdUser = await this.repository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return BaseService.resolve(createdUser);
    } catch (error) {
      return BaseService.reject(error);
    }
  }

  async findByEmail(email) {
    return this.repository.findByEmail(email);
  }

  async addRole(user, role) {
    return this.repository.addRole(user, role);
  }
}
