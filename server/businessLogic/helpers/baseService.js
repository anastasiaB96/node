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
    try {
      const result = await this.repository.findAll();

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findById(id) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    try {
      const result = await this.repository.findById(id);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async find(condition) {
    try {
      const result = await this.repository.find(condition);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async create(info) {
    try {
      const result = await this.repository.create(info);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async updateById(id, data) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    try {
      const result = await this.repository.updateById(id, data);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async deleteAll() {
    try {
      const result = await this.repository.deleteAll();

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async deleteById(id) {
    if (!id) {
      return this.reject(new BadRequestError('Id is required'));
    }

    try {
      const result = await this.repository.deleteById(id);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async delete(condition) {
    try {
      const result = await this.repository.delete(condition);

      return this.resolve(result);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}