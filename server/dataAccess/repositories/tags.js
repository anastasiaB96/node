export default class TagsRepository {
  constructor(logger) {
    this.logger = logger;
    this.__todos = [
      {id: 1, name: 'tag1'},
      {id: 2, name: 'tag2'}
    ];
  }

  async get() {
    this.logger.debug(`Getting all tags`);
    return this.__todos;
  }
}