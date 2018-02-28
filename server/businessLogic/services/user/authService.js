'use strict';

import jwt from 'jsonwebtoken';
import config from 'config';

export default class AuthService {
  constructor(userService) {
    this.userService = userService;
  }

  static _generateJWTToken(user) {
    const { password, ...userInfoWithoutPassword } = user.dataValues;

    return jwt.sign(userInfoWithoutPassword, config.get('auth.secret'), { expiresIn: '1h' });
  }

  async register(data) {
    const existingUser = await this.userService.findByEmail(data.email);

    if (existingUser) {
      return Promise.reject({ message: 'User already exists' });
    } else {
      return await this.userService.create(data);
    }
  }

  async login(data) {
    const { email, password } = data;
    if (email && password) {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const isValid = await user.validPassword(password);

        if (isValid) {
          const token = AuthService._generateJWTToken(user);

          return Promise.resolve({ name: user.firstName, token: 'Bearer ' + token });
        } else {
          return Promise.reject({ message: 'Invalid credentials' });
        }
      } else {
        return Promise.reject({ message: 'User doesn\'t exist' });
      }
    }
  }
}
