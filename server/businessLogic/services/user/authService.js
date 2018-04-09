'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';
import BaseService from '../baseService';
import ROLES from '../../../constants/roles';
import * as userDALtoDTO from '../../models/user/userDALtoDTO.json';

export default class AuthService extends BaseService {
  constructor(errorsHelper, logger, mapper, userService, roleService) {
    super({ errorsHelper, logger, mapper });
    this.userService = userService;
    this.roleService = roleService;
  }

  static _generateJWTToken(user) {
    const { password, ...userInfoWithoutPassword } = user;

    return jwt.sign(userInfoWithoutPassword, config.get('auth.secret'), { expiresIn: config.get('auth.tokenExpiration') });
  }

  async register(userInfo) {
    try {
      const existingUser = await this.userService.findByEmail(userInfo.email);

      if (existingUser) {
        return this.reject(this.errorsHelper.errors.userExists);
      }

      const createdUser = await this.userService.create(userInfo);

      return this.resolve(this.mapper.mapObject(createdUser, userDALtoDTO));
    } catch (error) {
      return this.reject(this.errorsHelper.createInternalServerError());
    }
  }

  async login(userInfo) {
    try {
      const { email, password } = userInfo;

      if (!email || !password) {
        return this.reject(this.errorsHelper.errors.invalidCredentials);
      }

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return this.reject(this.errorsHelper.errors.userNotExists);
      }

      const isValid = await user.validPassword(password);

      if (!isValid) {
        return this.reject(this.errorsHelper.errors.invalidCredentials);
      }

      const token = AuthService._generateJWTToken(this.mapper.mapObject(user, userDALtoDTO));

      return this.resolve({ name: user.firstName, token: 'Bearer ' + token });
    } catch (error) {
      return this.reject(this.errorsHelper.internalServerError);
    }
  }

  async permitAdmin(userInfo) {
    try {
      const { email } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return this.reject(this.errorsHelper.userNotExists);
      }

      const adminRole = await this.roleService.findByName(ROLES.admin);

      if (!adminRole) {
        return this.reject('Role doesn\'t exist.');
      }

      return await this.userService.addRole(user, adminRole);
    } catch (error) {
      return this.reject(this.errorsHelper.createInternalServerError());
    }
  }
}
