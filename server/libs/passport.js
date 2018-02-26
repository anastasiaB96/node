'use strict';

import { KoaPassport } from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

export default class Passport {
  constructor(userService) {
    this._passport = new KoaPassport();
    this.userService = userService;

    this._passport.use('login', this._localLoginStrategy);
    this._passport.use('jwt', this._jwtStrategy);
  }

  get _localLoginStrategy() {
    return new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, async (email, password, done) => {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const isValid = user.validPassword(password);

        if (isValid) {
          const payload = {
            id: user.id,
            displayName: user.displayName,
            email: user.email
          };
          const token = jwt.sign(payload, 'secret');

          return done(null, { userName: user.firstName, token: 'JWT ' + token });
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      } else {
        return done(null, false, { message: 'User doesn\'t exist' });
      }
    });
  }

  get _jwtStrategy() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret'
    };

    return new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      const user = await this.userService.findById(jwt_payload.id);

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
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