'use strict';

export default class BaseError {
  constructor({ name, message }) {
    this.name = name;
    this.message = message || 'Sorry, something went wrong :(';
  }
}