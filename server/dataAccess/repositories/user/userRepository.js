'use strict';

import BaseRepository from '../baseRepository';

export default class UserRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super({ logger, dbContext, modelName: 'User' });
    this.Role = dbContext.models['Role'];
  }

  async findByEmail(email) {
    return this.Model.find({
      where: { email },
      include: [{ model: this.Role, as: 'role', attributes: ['name'] }]
    });
  }

  async addRole(user, role) {
    return await user.addRole(role);
  }
}
