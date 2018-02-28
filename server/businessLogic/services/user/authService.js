'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';
import BaseService from '../baseService';

export default class AuthService extends BaseService {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  static _generateJWTToken(user) {
    const { password, ...userInfoWithoutPassword } = user;

    return jwt.sign(userInfoWithoutPassword, config.get('auth.secret'), { expiresIn: config.get('auth.tokenExpiration') });
  }

  async register(userInfo) {
    try {
      const existingUser = await this.userService.findByEmail(userInfo.email);

      if (existingUser) {
        return this.reject('User already exists');
      } else {
        const createdUser = await this.userService.create(userInfo);
        return this.resolve(createdUser);
      }
    } catch (error) {
      return this.reject(error.name);
    }
  }

  async login(userInfo) {
    try {
      const { email, password } = userInfo;

      if (email && password) {
        const user = await this.userService.findByEmail(email);

        if (user) {
          const isValid = await user.validPassword(password);

          if (isValid) {
            const token = AuthService._generateJWTToken(user.dataValues);

            return this.resolve({ name: user.firstName, token: 'Bearer ' + token });
          } else {
            return this.reject('Invalid credentials');
          }
        } else {
          return this.reject('User doesn\'t exist');
        }
      } else {
        return this.reject('Invalid credentials');
      }
    } catch (error) {
      return this.reject(error.name);
    }
  }
}
