'use strict';

import ERRORS from '../../constants/errors';

export default class BaseService {
  constructor({ errorsHelper, logger, mapper, repository }) {
    this.logger = logger;
    this.mapper = mapper;
    this.repository = repository;
    this.errorsHelper = errorsHelper;
  }

  resolve(operationResult) {
    return Promise.resolve(operationResult)
  }

  reject(error) {
    if (error === ERRORS.internalServer) {
      this.logger.error(error);
    }

    return Promise.reject(error)
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async create(info) {
    return this.repository.create(info);
  }

  async updateById(data, id) {
    return this.repository.updateById(data, id);
  }

  async deleteAll() {
    return this.repository.deleteAll();
  }

  async deleteById(id) {
    return this.repository.deleteById(id);
  }

  async delete(condition) {
    return this.repository.delete(condition);
  }
}