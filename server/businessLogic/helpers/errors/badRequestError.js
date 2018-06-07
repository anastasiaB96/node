'use strict';

import BaseError from './baseError';
import ERRORS from '../../../constants/errors';

export default class BadRequestError extends BaseError {
  constructor(message) {
    super({ name: ERRORS.badRequest, message });
  }
}