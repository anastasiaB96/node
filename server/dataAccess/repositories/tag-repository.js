export default class TagRepository {
  constructor(logger) {
    this.logger = logger;
    this._tags = [
      {id: 1, name: 'tag1'},
      {id: 2, name: 'tag2'}
    ];
  }

  async getAll() {
    this.logger.debug(`Getting all tags`);
    return this._tags;
  }
}