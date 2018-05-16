'use strict';

import Repository from './repository';

export default class QuestionRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Question' });
    this.Tag = this.dbContext.models['Tag'];
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
        model: this.Tag,
        as: 'tag',
        attributes: ['name'],
        where: { '$tag.id$': { $in: searchInfo} }
      }]
    })
  }
}