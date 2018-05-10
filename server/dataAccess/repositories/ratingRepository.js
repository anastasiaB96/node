'use strict';

import Repository from './repository';

export default class RatingRepository extends Repository {
  constructor({ logger, dbContext, modelName }) {
    super({ logger, dbContext, modelName });
  }
}