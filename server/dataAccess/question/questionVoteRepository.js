'use strict';

import BaseRepository from '../helpers/baseRepository';

export default class QuestionVoteRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'QuestionVote' });
  }
}