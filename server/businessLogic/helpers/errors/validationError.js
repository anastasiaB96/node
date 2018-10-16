import BaseError from './baseError';
import { BUSINESS_ERROR } from '../../../constants/errors';

export default class ValidationError extends BaseError {
  constructor(message) {
    super({ name: BUSINESS_ERROR.validationError, message });
  }
}
