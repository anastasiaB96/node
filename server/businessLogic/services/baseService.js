'use strict';

export default class BaseService {
  constructor(mapper) {
    this.mapper = mapper;
  }

  reject(errorMessage) {
    return Promise.reject({
      success: false,
      errorMessage
    })
  }

  resolve(result) {
    return Promise.resolve({
      success: true,
      result
    })
  }
}