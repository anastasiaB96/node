'use strict';

import InternalError from './errors/internalError';

export default class BaseService {
  constructor({ logger, mapper, repository, modelsValidator }) {
    this.logger = logger;
    this.mapper = mapper;
    this.validator = modelsValidator;
    this.repository = repository;
  }

  resolve(operationResult) {
    return Promise.resolve(operationResult)
  }

  reject(error) {
    if (error instanceof InternalError) {
      this.logger.error(error.info);
    }

    return Promise.reject(error)
  }

  async findAll() {
    try {
      return this.repository.findAll();
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findById(id) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async find(condition) {
    try {
      return this.repository.find(condition);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async create(info) {
    try {
      return this.repository.create(info);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async updateById(data, id) {
    try {
      return this.repository.updateById(data, id);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async deleteAll() {
    try {
      return this.repository.deleteAll();
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async deleteById(id) {
    try {
      return this.repository.deleteById(id);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async delete(condition) {
    try {
      return this.repository.delete(condition);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}