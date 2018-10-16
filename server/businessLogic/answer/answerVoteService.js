'use strict';

import BaseService from '../helpers/baseService';

export default class AnswerVoteService extends BaseService {
  constructor(mapper, answerVoteRepository) {
    super({ mapper, repository: answerVoteRepository });
  }

  async getRating(answerId) {
    return this.wrapError(async () => {
      const result = await this.find({ answerId });

      return result ? result.length : 0;
    });
  }
}