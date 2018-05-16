'use strict';

import ERRORS from '../../constants/errors';

export default class Service {
  constructor({ errorsHelper, logger, mapper, repository }) {
    this.logger = logger;
    this.mapper = mapper;
    this.repository = repository;
    this.errorsHelper = errorsHelper;
  }

  resolve(operationResult) {
    return Promise.resolve(operationResult)
  }

  reject({ errorType, errorMessage }, error) {
    if (errorType === ERRORS.internalServer) {
      this.logger.error(error);
    }

    return Promise.reject({ errorType, errorMessage })
  }

  async findAll() {
    try {
      return this.repository.findAll();
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async find(condition) {
    try {
      return this.repository.find(condition);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async create(info) {
    try {
      return this.repository.create(info);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async updateById(data, id) {
    try {
      return this.repository.updateById(data, id);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteAll() {
    try {
      return this.repository.deleteAll();
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteById(id) {
    try {
      return this.repository.deleteById(id);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async delete(condition) {
    try {
      return this.repository.delete(condition);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}