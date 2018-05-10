'use strict';

import RatingService from './ratingService';

export default class AnswerRatingService extends RatingService {
  constructor(errorsHelper, logger, mapper, answerRatingRepository) {
    super({ errorsHelper, logger, mapper, repository: answerRatingRepository });
  }
}