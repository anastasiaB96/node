'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';
import BaseService from '../helpers/baseService';
import ROLES from '../../constants/roles';
import ValidationError from '../helpers/errors/validationError';
import * as userDALtoDTO from './models/userDALtoDTO.json';

export default class AuthService extends BaseService {
  constructor(mapper, userService, roleService, modelsValidator) {
    super({ mapper, modelsValidator });
    this.userService = userService;
    this.roleService = roleService;
  }

  static _generateJWTToken(user) {
    const { password, ...userInfoWithoutPassword } = user;

    return jwt.sign(userInfoWithoutPassword, config.get('auth.secret'), { expiresIn: config.get('auth.tokenExpiration') });
  }

  async register(userInfo) {
    return this.wrapError(async () => {
      const { email } = userInfo;
      const existingUser = await this.userService.findByEmail(email);

      if (existingUser) {
        return Promise.reject(new ValidationError('User already exists.'));
      }

      const createdUser = await this.userService.create(userInfo);

      return { id: createdUser.id };
    });
  }

  async login(userInfo) {
    return this.wrapError(async () => {
      const { email, password } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return Promise.reject(new ValidationError('User doesn\'t exists.'));
      }

      const isValid = await user.validPassword(password);

      if (!isValid) {
        return Promise.reject(new ValidationError('Invalid credentials.'));
      }

      const token = AuthService._generateJWTToken(this.mapper.mapObject(user, userDALtoDTO));

      return { name: user.firstName, token: 'Bearer ' + token };
    });
  }

  async permitAdmin(userInfo) {
    return this.wrapError(async () => {
      const { email } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return Promise.reject(new ValidationError('User doesn\'t exists.'));
      }

      const adminRole = await this.roleService.findByName(ROLES.admin);

      if (!adminRole) {
        return Promise.reject(new ValidationError('Role doesn\'t exists.'));
      }

      return this.userService.addRole(user, adminRole);
    });
  }
}
