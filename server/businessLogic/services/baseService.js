'use strict';

export default class BaseService {
  constructor(mapper, repository) {
    this.mapper = mapper;
    this.repository = repository;
  }

  static reject(errorMessage) {
    return Promise.reject({
      success: false,
      errorMessage
    })
  }

  static resolve(result) {
    return Promise.resolve({
      success: true,
      result
    })
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    return this.repository.findById(id);
  }
}