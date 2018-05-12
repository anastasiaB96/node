'use strict';

import VoteRepository from './voteRepository';

export default class AnswerVoteRepository extends VoteRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'AnswerVotes' });
  }
}