'use strict';

export default class TagRepository {
  constructor(logger, dbContext) {
    this.logger = logger;
    this.question = dbContext.models['Question'];
  }

  async getAll() {
    return await this.question.findAll({
      where: {
        title: 'test'
      }
    });
  }
}
