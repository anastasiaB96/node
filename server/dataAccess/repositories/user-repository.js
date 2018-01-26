'use strict';

export default class UserRepository {
  constructor() {
    this._users = [
      {
        id: 1,
        email: 'user1',
        password: '123'
      }
    ]
  }

  async create() {

  }

  async update() {

  }

  async findByEmail(email) {
    const user = this._users.find(user => user.email === email);

    if (!user) {
      return null
    }

    return Promise.resolve({ ...user });
  }
}