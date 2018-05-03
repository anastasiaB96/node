'use strict';

import Repository from '../repository';

export default class UserRepository extends Repository {
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
