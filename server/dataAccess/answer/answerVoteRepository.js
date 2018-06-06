'use strict';

import BaseRepository from '../helpers/baseRepository';

export default class AnswerVoteRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'AnswerVote' });
  }
}