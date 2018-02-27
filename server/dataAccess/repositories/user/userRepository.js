'use strict';

import BaseRepository from '../baseRepository';

export default class UserRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super(logger, dbContext, 'User');
  }

  async create(user) {
    return this.Model.create(user);
  }

  async findById(id) {
    return this.Model.find({ where: { id } });
  }

  async findByEmail(email) {
    return this.Model.find({ where: { email } });
  }
}
