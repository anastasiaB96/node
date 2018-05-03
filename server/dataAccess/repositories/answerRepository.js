'use strict';

import Repository from './repository';

export default class AnswerRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Answer' });
  }
}