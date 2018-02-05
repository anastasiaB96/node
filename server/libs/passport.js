'use strict';

import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default class Passport {
  constructor(userService) {
    this._passport = passport;
    this.userService = userService;

    this._passport.use('signup', this._createLocalSignupStrategy());
    this._passport.use('login', this._createLocalLoginStrategy());
    this._passport.use('jwt', this._createJwtStrategy());
  }

  _createLocalSignupStrategy() {
    return new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, async (email, password, done) => {
      const user = await this.userService.findByEmail(email);

      if (user) {
        return done(null, false, { message: 'User already exists' });
      } else {
        const user = await this.userService.create({email, password});
        return done(null, user);
      }
    });
  }

  _createLocalLoginStrategy() {
    return new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    }, async (email, password, done) => {
      const user = await this.userService.findByEmail(email);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Auth error' });
      }
    });
  }

  _createJwtStrategy() {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';

    return new JwtStrategy(opts, function(jwt_payload, done) {
      this.userService.findByEmail({id: jwt_payload.sub}, function(err, user) {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
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