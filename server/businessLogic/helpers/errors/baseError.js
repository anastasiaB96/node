'use strict';

import ERRORS from '../../../constants/errors';

export default class BaseError {
  constructor({ name, message }) {
    this.name = name || ERRORS.internal;
    this.message = message || 'Sorry, something went wrong :(';
  }
}