'use strict';

import BaseService from '../helpers/baseService';
import ROLES from '../../constants/roles';
import * as userDALtoDTO from './models/userDALtoDTO.json';

export default class UserService extends BaseService {
  constructor(logger, mapper, userRepository, roleService) {
    super({ logger, mapper, repository: userRepository });
    this.roleService = roleService;
  }

  async create(user) {
    return this.wrapError(async () => {
      const createdUser = await this.repository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return this.resolve(this.mapper.mapObject(createdUser, userDALtoDTO));
    });
  }

  async findByEmail(email) {
    return this.wrapError(async () => {
      return this.repository.findByEmail(email)
    });
  }

  async addRole(user, role) {
    return this.wrapError(async () => {
      return this.repository.addRole(user, role);
    });
  }
}
