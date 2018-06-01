'use strict';

import Repository from './repository';

export default class QuestionRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Question' });
    this.Tag = this.dbContext.models['Tag'];
  }

  async setRating(questionId, rating) {
    return super.updateById(questionId, { rating });
  }

  async addTagToQuestion(question, tag) {
    return question.addTag(tag);
  }

  async removeTagFromQuestion(question, tag) {
    return question.removeTag(tag);
  }

  async filterByTags(searchInfo) {
    return this.Model.findAll({
      include: [{
        ...this.joinModel(this.Tag, 'tag', ['name']),
        where: { '$tag.id$': { $in: searchInfo} }
      }]
    })
  }
}