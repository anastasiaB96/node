'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class Answer extends Base {
  static get schema() {
    return Object.assign({}, super.defaultProperties, {
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  }

  static init(sequelize) {
    return super.init(this.schema, sequelize);
  };

  static associate(models) {
    this.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.belongsTo(models.Question, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};