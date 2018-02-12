'use strict';

export default class TagRepository {
  constructor(logger, dbContext) {
    this.logger = logger;
    this.Model = dbContext.models.Question;
  }

  async getAll() {
    return await this.Model.findAll();
  }
}
