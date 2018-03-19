'use strict';

import BaseRepository from '../baseRepository';

export default class UserRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super(logger, dbContext, 'User');
  }

  async findByEmail(email) {
    return this.Model.find({ where: { email } });
  }

  async addRole(user, role) {
    return await user.addRole(role);
  }
}
