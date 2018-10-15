'use strict';

import InternalError from './errors/internalError';
import BadRequestError from './errors/badRequestError';

export default class BaseService {
  constructor({ logger, mapper, repository, modelsValidator }) {
    this.logger = logger;
    this.mapper = mapper;
    this.validator = modelsValidator;
    this.repository = repository;
  }

  async wrapError(operation) {
    try {
      const result = await operation();

      return this.resolve(result);
    } catch (error) {
      return this.reject(error);
    }
  }

  resolve(operationResult) {
    return Promise.resolve(operationResult);
  }

  reject(error) {
    if (error instanceof InternalError) {
      this.logger.error(error.info);
    }

    return Promise.reject(error);
  }

  async findAll() {
    return this.wrapError(async () => {
      const result = await this.repository.findAll();

      return this.resolve(result);
    });
  }

  async findById(id) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      const result = await this.repository.findById(id);

      return this.resolve(result);
    });
  }

  async find(condition) {
    return this.wrapError(async () => {
      const result = await this.repository.find(condition);

      return this.resolve(result);
    });
  }

  async create(info) {
    return this.wrapError(async () => {
      const result = await this.repository.create(info);

      return this.resolve(result);
    });
  }

  async updateById(id, data) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      const result = await this.repository.updateById(id, data);

      return this.resolve(result);
    });
  }

  async deleteAll() {
    return this.wrapError(async () => {
      const result = await this.repository.deleteAll();

      return this.resolve(result);
    });
  }

  async deleteById(id) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      const result = await this.repository.deleteById(id);

      return this.resolve(result);
    });
  }

  async delete(condition) {
    return this.wrapError(async () => {
      const result = await this.repository.delete(condition);

      return this.resolve(result);
    });
  }
}