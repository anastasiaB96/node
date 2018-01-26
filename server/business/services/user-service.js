'use strict';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create() {
    return this.userRepository.create();
  }

  async update() {
    return this.userRepository.update();
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
}