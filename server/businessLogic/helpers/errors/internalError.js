'use strict';

import BaseError from './baseError';
import ERRORS from '../../../constants/errors';

export default class InternalError extends BaseError {
  constructor(error) {
    super({
      name: ERRORS.internalServer,
      message: 'Internal server error',
      info: error
    });
  }
}