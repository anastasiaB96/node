'use strict';

class QuestionRatings {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('QuestionRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('QuestionRatings');
  }
}

export default new QuestionRatings();