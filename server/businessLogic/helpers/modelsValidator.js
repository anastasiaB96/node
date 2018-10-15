'use strict';

import validate from 'validate.js';

class ModelsValidator {
  constructor(validator) {
    this._validator = validator;
  }

  getConstraintErrors(model, constraints) {
    return this._validator(model, constraints, { format: 'flat' });
  }
}

export default new ModelsValidator(validate);