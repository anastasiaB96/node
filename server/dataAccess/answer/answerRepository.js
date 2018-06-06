'use strict';

import BaseRepository from '../helpers/baseRepository';

export default class AnswerRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Answer' });
  }

  async setRating(answerId, rating) {
    return super.updateById(answerId, { rating });
  }
}