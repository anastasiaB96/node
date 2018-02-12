'use strict';

export default class TagRepository {
  constructor(logger, dbContext) {
    this.logger = logger;
    this.questions = dbContext.models.Question;
  }

  async getAll() {
    return await this.questions.findAll();
  }
}
