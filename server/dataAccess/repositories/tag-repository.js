'use strict';

export default class TagRepository {
  constructor(logger) {
    this.logger = logger;
    this._tags = [
      {id: 1, name: 'tag1'},
      {id: 2, name: 'tag2'}
    ];
  }

  async getAll() {
    this.logger.info(`Getting all tags`);
    return Promise.resolve(this._tags);
  }
}