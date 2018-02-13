'use strict';

import { KoaPassport } from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default class Passport {
  constructor(userService) {
    this._passport = new KoaPassport();
    this.userService = userService;

    this._passport.use('login', this._createLocalLoginStrategy());
    this._passport.use('jwt', this._createJwtStrategy());
  }

  _createLocalLoginStrategy() {
    return new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, async (email, password, done) => {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const isValid = await user.validPassword(password);

        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      } else {
        return done(null, false, { message: 'User doesn\'t exist' });
      }
    });
  }

  _createJwtStrategy() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';

    return new JwtStrategy(opts, (jwt_payload, done) => {

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