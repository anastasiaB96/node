'use strict';

import Repository from './repository';

export default class AnswerRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Answer' });
  }

  async setRating(answerId, rating) {
    return super.updateById(answerId, { rating });
  }
}