'use strict';

export const HTTP_ERROR = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404
};

export const BUSINESS_ERROR = {
  validationError: 'Validation failure'
};

export const businessErrorToHttpError = {
  [BUSINESS_ERROR.validationError]: HTTP_ERROR.badRequest
};
