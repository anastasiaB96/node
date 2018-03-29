'use strict';

import bcrypt from 'bcrypt';

class User {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('password', bcrypt.genSaltSync(8));

    return queryInterface.bulkInsert('Users', [{
      firstName: 'Admin',
      lastName: 'Admin',
      password: password,
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
}

export default new User();
