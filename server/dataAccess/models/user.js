'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class User extends Base {
  static get schema() {
    return {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, sequelize);
  };

  static associate({ Question, Answer }) {
    this.hasMany(Question, {
      as: 'question',
      foreignKey: 'userId'
    });

    this.hasMany(Answer, {
      as: 'answer',
      foreignKey: 'userId'
    });
  }
};