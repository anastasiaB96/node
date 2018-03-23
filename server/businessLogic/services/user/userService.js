'use strict';

import BaseService from '../baseService';
import ROLES from '../../../constants/roles';

export default class UserService extends BaseService {
  constructor(userRepository, roleService) {
    super();
    this.userRepository = userRepository;
    this.roleService = roleService;
  }

  async create(user) {
    try {
      const createdUser = await this.userRepository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return this.resolve(createdUser);
    } catch (error) {
      return this.reject(error);
    }
  }

  async findById(id) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async addRole(user, role) {
    return this.userRepository.addRole(user, role);
  }
}
