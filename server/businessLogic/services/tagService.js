'use strict';

export default class TagService {
  constructor(tagRepository) {
    this.tagRepository = tagRepository;
  }

  async getAll() {
    return this.tagRepository.findAll();
  }
}
