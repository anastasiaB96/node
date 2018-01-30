'use strict';

export default class UserRepository {
  constructor() {
    this._users = [
      {
        id: 1,
        email: 'test1',
        password: 'test1'
      }
    ];
  }

  async create(userData) {
    this._users.push(userData);
  }

  async findByEmail(email) {
    const user = this._users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return Promise.resolve({ ...user });
  }
}
