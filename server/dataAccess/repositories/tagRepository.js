'use strict';

import BaseRepository from './baseRepository';

export default class TagRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Tag' });
  }
}
