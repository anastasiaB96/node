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

    return jwt.sign(userInfoWithoutPassword, config.get('auth.secret'), { expiresIn: '1h' });
  }

  async register(data) {
    try {
      const existingUser = await this.userService.findByEmail(data.email);

      if (existingUser) {
        return Promise.reject({ message: 'User already exists' });
      } else {
        return await this.userService.create(data);
      }
    } catch (error) {
      return Promise.reject({ message: 'Registration failed', ...error });
    }
  }

  async login(data) {
    try {
      const { email, password } = data;
      if (email && password) {
        const user = await this.userService.findByEmail(email);

        if (user) {
          const isValid = await user.validPassword(password);

          if (isValid) {
            const token = AuthService._generateJWTToken(user.dataValues);

            return Promise.resolve({ name: user.firstName, token: 'Bearer ' + token });
          } else {
            return Promise.reject({ message: 'Invalid credentials' });
          }
        } else {
          return Promise.reject({ message: 'User doesn\'t exist' });
        }
      }
    } catch (error) {
      return Promise.reject({ message: 'Authentication failed', ...error });
    }
  }
}
