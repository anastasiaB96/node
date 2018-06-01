'use strict';

import VoteRepository from './voteRepository';

export default class QuestionVoteRepository extends VoteRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'QuestionVote' });
  }
}