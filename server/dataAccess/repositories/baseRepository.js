'use strict';

export default class BaseRepository {
  constructor({ logger, dbContext, modelName }) {
    this.logger = logger;
    this.Model = dbContext.models[modelName];
  }

  async findAll() {
    return this.Model.findAll();
  }

  async findById(id) {
    return this.Model.find({ where: { id } });
  }

  async find(condition) {
    return this.Model.find({ where: condition });
  }

  async create(data) {
    return this.Model.create(data);
  }
}