'use strict';

import ERRORS from '../constants/errors';

class ErrorsHelper {
  constructor(logger) {
    this.logger = logger;
    this._errors = ERRORS;

    this._defaultHttpErrors = {
      [this._errors.badRequest]: {
        code: 400,
        userMessage: 'The JSON is invalid.'
      },
      [this._errors.unauthorized]: {
        code: 401,
        userMessage: 'Requires user authentication.',
      },
      [this._errors.forbidden]: {
        code: 403,
        userMessage: 'Access is not allow.'
      },
      [this._errors.internalServer]: {
        code: 500,
        userMessage: 'Something goes wrong, please try again :('
      },
      [this._errors.notFound]: {
        code: 404,
        userMessage: 'Resource is not found.'
      },
      [this._errors.unprocessableEntity]: {
        code: 422,
        userMessage: 'Unprocessable Entity'
      }
    };
  }

  getHttpErrorInfo(errorName, userMessage) {
    if (!this._defaultHttpErrors[errorName]) {
      return {
        code: 500,
        userMessage: userMessage || 'Something goes wrong, please try again :('
      };
    }

    const errorInfo = this._defaultHttpErrors[errorName];
    errorInfo.userMessage = userMessage || errorInfo.userMessage;

    return errorInfo;
  }
}

export default new ErrorsHelper();