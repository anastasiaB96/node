'use strict';

export default class BaseRepository {
  constructor(logger, dbContext, modelName) {
    this.logger = logger;
    this.Model = dbContext.models[modelName];
  }

  async create(data) {
    return this.Model.create(data);
  }

  async findById(id) {
    return this.Model.find({ where: { id } });
  }

  async findBy(condition) {
    return this.Model.find({ where: condition });
  }

  async findAll() {
    return this.Model.findAll();
  }
}