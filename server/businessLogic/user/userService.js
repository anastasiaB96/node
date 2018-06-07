'use strict';

import BaseService from '../helpers/baseService';
import ROLES from '../../constants/roles';
import InternalError from '../helpers/errors/internalError';
import * as userDALtoDTO from './models/userDALtoDTO.json';

export default class UserService extends BaseService {
  constructor(logger, mapper, userRepository, roleService) {
    super({ logger, mapper, repository: userRepository });
    this.roleService = roleService;
  }

  async create(user) {
    try {
      const createdUser = await this.repository.create(user);
      const defaultRole = await this.roleService.findByName(ROLES.user);

      await this.addRole(createdUser, defaultRole);

      return this.resolve(this.mapper.mapObject(createdUser, userDALtoDTO));
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findByEmail(email) {
    try {
      return this.repository.findByEmail(email)
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async addRole(user, role) {
    try {
      return this.repository.addRole(user, role);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}
