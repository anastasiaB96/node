'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';
import BaseService from '../helpers/baseService';
import ROLES from '../../constants/roles';
import BadRequestError from '../helpers/errors/badRequestError';
import * as userDALtoDTO from './models/userDALtoDTO.json';

export default class AuthService extends BaseService {
  constructor(logger, mapper, userService, roleService, modelsValidator) {
    super({ logger, mapper, modelsValidator });
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
        return this.reject(new BadRequestError('User already exists.'));
      }

      const createdUser = await this.userService.create(userInfo);

      return this.resolve({ id: createdUser.id });
    });
  }

  async login(userInfo) {
    return this.wrapError(async () => {
      const { email, password } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return this.reject(new BadRequestError('User doesn\'t exists.'));
      }

      const isValid = await user.validPassword(password);

      if (!isValid) {
        return this.reject(new BadRequestError('Invalid credentials.'));
      }

      const token = AuthService._generateJWTToken(this.mapper.mapObject(user, userDALtoDTO));

      return this.resolve({ name: user.firstName, token: 'Bearer ' + token });
    });
  }

  async permitAdmin(userInfo) {
    return this.wrapError(async () => {
      const { email } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return this.reject(new BadRequestError('User doesn\'t exists.'));
      }

      const adminRole = await this.roleService.findByName(ROLES.admin);

      if (!adminRole) {
        return this.reject(new BadRequestError('Role doesn\'t exists.'));
      }

      return this.userService.addRole(user, adminRole);
    });
  }
}
