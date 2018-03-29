'use strict';

import ROLES from '../../constants/roles';

class Role {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: ROLES.admin,
      description: 'Full access',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: ROLES.user,
      description: 'Default role',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
}

export default new Role();
