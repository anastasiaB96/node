'use strict';

import RatingService from './ratingService';

export default class QuestionRatingService extends RatingService {
  constructor(errorsHelper, logger, mapper, questionRatingRepository) {
    super({ errorsHelper, logger, mapper, repository: questionRatingRepository });
  }
}