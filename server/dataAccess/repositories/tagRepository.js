'use strict';

import Repository from './repository';

export default class TagRepository extends Repository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Tag' });
  }
}
