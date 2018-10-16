'use strict';

import BaseService from '../helpers/baseService';

export default class QuestionVoteService extends BaseService {
  constructor(mapper, questionVoteRepository) {
    super({ mapper, repository: questionVoteRepository });
  }

  async getRating(questionId) {
    return this.wrapError(async () => {
      const result = await this.find({ questionId });

      return result ? result.length : 0;
    });
  }
}