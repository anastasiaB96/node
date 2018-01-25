export default class TagsService {
  constructor(tagsRepository) {
    this.tagsRepository = tagsRepository
  }

  async get() {
    return this.tagsRepository.get();
  }
}