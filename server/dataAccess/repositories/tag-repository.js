'use strict';

export default class TagRepository {
  constructor(logger, Question) {
    this.logger = logger;
    this.question = Question;
  }

  async getAll() {
    return await this.question.findAll({
      where: {
        title: 'test'
      }
    });
  }
}
