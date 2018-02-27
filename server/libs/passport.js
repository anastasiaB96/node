'use strict';

import { KoaPassport } from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

export default class Passport {
  constructor(userService) {
    this._passport = new KoaPassport();
    this.userService = userService;

    this._passport.use('login', this._initLocalLoginStrategy());
    this._passport.use('jwt', this._initJwtStrategy());
  }

  _generateJWTToken(user) {
    const payload = {
      id: user.id,
      name: user.firstName,
      email: user.email
    };

    return jwt.sign(payload, 'secret');
  }

  _initLocalLoginStrategy() {
    return new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, async (email, password, done) => {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const isValid = await user.validPassword(password);

        if (isValid) {
          const token = this._generateJWTToken(user);

          return done(null, { name: user.firstName, token: 'Bearer ' + token });
        } else {
          return done(null, null, { message: 'Invalid credentials' });
        }
      } else {
        return done(null, null, { message: 'User doesn\'t exist' });
      }
    });
  }

  _initJwtStrategy() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret'
    };

    return new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      const user = await this.userService.findById(jwt_payload.id);

      if (user) {
        done(null, user)
      } else {
        done(null, null)
      }
    });
  }

  init() {
    return this._passport.initialize();
  }

  session() {
    return this._passport.session();
  }

  auth(strategy, callback) {
    return this._passport.authenticate(strategy, callback);
  }
}