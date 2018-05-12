'use strict';

import VoteService from './voteService';

export default class QuestionVoteService extends VoteService {
  constructor(errorsHelper, logger, mapper, questionVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: questionVoteRepository });
  }
}