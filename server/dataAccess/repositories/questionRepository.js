'use strict';

import Repository from './repository';

export default class QuestionRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Question' });
  }
}