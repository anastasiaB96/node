'use strict';

export default class BaseService {
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