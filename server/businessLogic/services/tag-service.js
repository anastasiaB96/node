export default class TagService {
  constructor(tagRepository) {
    this.tagRepository = tagRepository
  }

  async getAll() {
    return await this.tagRepository.getAll();
  }
}