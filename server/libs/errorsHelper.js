'use strict';

import ERRORS from '../constants/errors';

class ErrorsHelper {
  constructor(logger) {
    this.logger = logger;
    this._errors = ERRORS;

    this._httpErrors = {
      [this._errors.badRequest]: {
        code: 400,
        userMessage: 'The JSON is invalid.'
      },
      [this._errors.userExists]: {
        code: 400,
        userMessage: 'User already exists.'
      },
      [this._errors.userNotExists]: {
        code: 400,
        userMessage: 'The user doesn\'t exists.'
      },
      [this._errors.invalidCredentials]: {
        code: 400,
        userMessage: 'Invalid credentials.'
      },
      [this._errors.internalServer]: {
        code: 500,
        userMessage: 'Something goes wrong, please try again :('
      }
    };
  }

  getHttpErrorInfo(name) {
    if (!this._errors[name]) {
      return {
        code: 400,
        userMessage: 'Something goes wrong, please try again :('
      };
    }

    return this._httpErrors[name];
  }
}

export default new ErrorsHelper();