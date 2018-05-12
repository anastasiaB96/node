'use strict';

import VoteService from './voteService';

export default class AnswerVoteService extends VoteService {
  constructor(errorsHelper, logger, mapper, answerVoteRepository) {
    super({ errorsHelper, logger, mapper, repository: answerVoteRepository });
  }
}