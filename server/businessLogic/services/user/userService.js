'use strict';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(user) {
    return this.userRepository.create(user);
  }

  async findById(id) {
    return this.userRepository.findById(id);
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }

  async addRole(user, role) {
    return this.userRepository.addRole(user, role);
  }
}
