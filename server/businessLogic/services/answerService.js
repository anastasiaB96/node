'use strict';

import AuditableService from './auditableService';

export default class AnswerService extends AuditableService {
  constructor(errorsHelper, logger, mapper, answerRepository, answerVoteService) {
    super({ errorsHelper, logger, mapper, repository: answerRepository });

    this.answerVoteService = answerVoteService;
  }

  async addVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.create(info);
  }

  async removeVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.delete(info);
  }
}