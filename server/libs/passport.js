'use strict';

import passport from 'koa-passport';
import LocalStrategy from 'passport-local';

export default class Passport {
  constructor(userService) {
    this._passport = passport;
    this.userService = userService;

    this._addLocalStrategy(this._passport);
  }

  _createLocalStrategy() {
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

  _addLocalStrategy(passport) {
    passport.use(this._createLocalStrategy());
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

/*import { Strategy } from 'passport-jwt';
const { JwtStrategy, ExtractJwt } = Strategy;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  userService.findByEmail({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));*/