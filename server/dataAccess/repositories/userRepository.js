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

  async create({ email, password }) {
    const user = {
      id: this._users.length,
      email,
      password
    };

    this._users.push(user);

    return Promise.resolve(user);
  }

  async findByEmail(email) {
    const user = this._users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return Promise.resolve({ ...user });
  }
}
