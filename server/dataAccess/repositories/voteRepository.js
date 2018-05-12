'use strict';

import Repository from './repository';

export default class VoteRepository extends Repository {
  constructor({ logger, dbContext, modelName }) {
    super({ logger, dbContext, modelName });
  }
}