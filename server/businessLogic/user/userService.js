'use strict';

import BaseService from '../helpers/baseService';
import ROLES from '../../constants/roles';
import * as userDALtoDTO from './models/userDALtoDTO.json';

export default class UserService extends BaseService {
  constructor(mapper, userRepository, roleService) {
    super({ mapper, repository: userRepository });
    this.roleService = roleService;
  }

  async create(user) {
    return this.wrapError(async () => {
      const createdUser = await this.repository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return this.mapper.mapObject(createdUser, userDALtoDTO);
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
