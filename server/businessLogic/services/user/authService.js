'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';
import BaseService from '../baseService';
import ROLES from '../../../constants/roles';
import * as userDALtoDTO from '../../models/user/userDALtoDTO.json';

export default class AuthService extends BaseService {
  constructor(userService, roleService, mapper) {
    super(mapper);
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
        return BaseService.reject('User already exists');
      }

      const createdUser = await this.userService.create(userInfo);

      return BaseService.resolve(this.mapper.mapObject(createdUser, userDALtoDTO));
    } catch (error) {
      return BaseService.reject(error.name);
    }
  }

  async login(userInfo) {
    try {
      const { email, password } = userInfo;

      if (!email || !password) {
        return BaseService.reject('Invalid credentials');
      }

      const user = await this.userService.findByEmail(email);

      if (!user) {
        return BaseService.reject('User doesn\'t exist');
      }

      const isValid = await user.validPassword(password);

      if (!isValid) {
        return BaseService.reject('Invalid credentials');
      }

      const token = AuthService._generateJWTToken(this.mapper.mapObject(user, userDALtoDTO));

      return BaseService.resolve({ name: user.firstName, token: 'Bearer ' + token });
    } catch (error) {
      return BaseService.reject(error.name);
    }
  }

  async permitAdmin(userInfo) {
    try {
      const { email } = userInfo;
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return BaseService.reject('User doesn\'t exist');
      }

      const adminRole = await this.roleService.findByName(ROLES.admin);

      if (!adminRole) {
        return BaseService.reject('Role doesn\'t exist.');
      }

      return await this.userService.addRole(user, adminRole);
    } catch (error) {
      return BaseService.reject(error);
    }
  }
}
