'use strict';

export default class BaseService {
  baseRejection(error) {
    return Promise.reject({
      success: false,
      error
    })
  }

  baseResolve(result) {
    return Promise.resolve({
      success: true,
      result
    })
  }
}