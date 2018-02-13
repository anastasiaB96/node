'use strict';

export default class BaseRepository {
  constructor(logger, dbContext, modelName) {
    this.logger = logger;
    this.Model = dbContext.models[modelName];
  }
}