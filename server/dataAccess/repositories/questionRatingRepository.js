'use strict';

import RatingRepository from './ratingRepository';

export default class QuestionRatingRepository extends RatingRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'QuestionRating' });
  }
}