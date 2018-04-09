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

  async updateById(data, id) {
    return this.Model.update(data, { where: { id } });
  }

  async deleteAll() {
    return this.Model.destroy({ where: { } });
  }

  async deleteById(id) {
    return this.Model.destroy({ where: { id } });

  }

  async delete(condition) {
    return this.Model.destroy({ where: { condition } });
  }
}