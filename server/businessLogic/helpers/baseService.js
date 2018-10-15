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

      return Promise.resolve(result);
    } catch (error) {
      this.logger.error(error);

      return Promise.reject(new InternalError(error));
    }
  }

  async findAll() {
    return this.wrapError(async () => {
      return await this.repository.findAll();
    });
  }

  async findById(id) {
    if (!id) {
      return Promise.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      return await this.repository.findById(id);
    });
  }

  async find(condition) {
    return this.wrapError(async () => {
      return await this.repository.find(condition);
    });
  }

  async create(info) {
    return this.wrapError(async () => {
      return await this.repository.create(info);
    });
  }

  async updateById(id, data) {
    if (!id) {
      return Promise.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      return await this.repository.updateById(id, data);
    });
  }

  async deleteAll() {
    return this.wrapError(async () => {
      return await this.repository.deleteAll();
    });
  }

  async deleteById(id) {
    if (!id) {
      return Promise.reject(new BadRequestError('Id is required'));
    }

    return this.wrapError(async () => {
      return await this.repository.deleteById(id);
    });
  }

  async delete(condition) {
    return this.wrapError(async () => {
      return await this.repository.delete(condition);
    });
  }
}