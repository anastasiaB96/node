'use strict';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(userData) {
    this.userRepository.create(userData);
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
}
