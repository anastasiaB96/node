'use strict';

import Repository from './repository';

export default class QuestionRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Question' });
  }

  async addTagToQuestion(question, tag) {
    return question.setTag(tag);
  }

  async removeTagFromQuestion(question, tag) {
    return question.removeTag(tag);
  }

  async filterByTags(searchInfo) {
    return this.Model.findAll({
      include: [{
        model: this.dbContext.models['Tag'],
        through: { where: { name: { $in: searchInfo} } }
      }]
    })
  }
}