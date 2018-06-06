'use strict';

import BaseRepository from '../helpers/baseRepository';

export default class TagRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'Tag' });
  }
}
