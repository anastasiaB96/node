'use strict';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(user) {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      return null;
    }

    return this.userRepository.create(user);
  }

  async findByEmail(email) {
    return this.userRepository.findByEmail(email);
  }
}
