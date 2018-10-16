'use strict';

import { businessErrorToHttpError } from "../../constants/errors";

export default class HttpError {
  constructor(error) {
    this.code = businessErrorToHttpError[error.name];
    this.userMessage = error.message || 'Sorry, something went wrong :(';
  }
}