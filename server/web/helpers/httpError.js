'use strict';

export default class HttpError {
  constructor(error) {
    this.code = error.name;
    this.userMessage = error.message;
  }
}