'use strict';

import User from '../models/user';
import Role from '../models/role';

class UserRole {
  async up(queryInterface, Sequelize) {
    /*const [ users, roles ] = await Promise.all([
      User.findAll({}),
      Role.findAll({})
    ]);
    const adminUser = users.find(user => user.name === 'Admin');
    const adminRole = roles.find(role => role.name === 'Admin');*/

    return queryInterface.bulkInsert('UserRoles', [{
      userId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserRoles', null, {});
  }
}

export default new UserRole();