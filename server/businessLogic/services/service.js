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
      const result = await this.repository.findAll();

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async findById(id) {
    try {
      const result = await this.repository.find(id);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async find(condition) {
    try {
      const result = await this.repository.find(condition);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async create(info) {
    try {
      const result = await this.repository.create(info);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async updateById(data, id) {
    try {
      const result = await this.repository.updateById(data, id);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteAll() {
    try {
      const result = await this.repository.deleteAll();

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteById(id) {
    try {
      const result = await this.repository.deleteById(id);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async delete(condition) {
    try {
      const result = await this.repository.delete(condition);

      return this.resolve(result);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}