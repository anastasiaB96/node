'use strict';

import RatingRepository from './ratingRepository';

export default class AnswerRatingRepository extends RatingRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'AnswerRating' });
  }
}