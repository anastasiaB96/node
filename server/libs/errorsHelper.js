'use strict';

class ErrorsHelper {
  constructor(logger) {
    this.logger = logger;
    this.errors = {
      badRequest: 'badRequest',
      userExists: 'userExists',
      userNotExists: 'userNotExists',
      invalidCredentials: 'invalidCredentials',
      internalServer: 'internalServer'
    };

    this._httpErrors = {
      [this.errors.badRequest]: {
        code: 400,
        userMessage: 'The JSON is invalid.'
      },
      [this.errors.userExists]: {
        code: 400,
        userMessage: 'User already exists.'
      },
      [this.errors.userNotExists]: {
        code: 400,
        userMessage: 'The user doesn\'t exists.'
      },
      [this.errors.invalidCredentials]: {
        code: 400,
        userMessage: 'Invalid credentials.'
      },
      [this.errors.internalServer]: {
        code: 500,
        userMessage: 'Invalid credentials.'
      }
    };
  }

  getHttpErrorInfo(name) {
    if (!this.errors[name]) {
      return;
    }

    return this._httpErrors[name];
  }

  createInternalServerError(error) {
    this.logger.error(error);

    return this.errors.internalServer;
  }
}

export default new ErrorsHelper();