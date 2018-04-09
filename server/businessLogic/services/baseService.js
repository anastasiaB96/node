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
}