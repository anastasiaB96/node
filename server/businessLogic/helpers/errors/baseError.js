'use strict';

import ERRORS from '../../../constants/errors';

export default class BaseError {
  constructor({ name, message }) {
    this.name = name || ERRORS.internalServer;
    this.message = message || 'Sorry, something went wrong :(';
  }
}