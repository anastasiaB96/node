'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class User extends Base {
  static get schema() {
    return Object.assign({}, super.defaultProperties, {
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
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
    })
  }

  static init(sequelize) {
    return super.init(this.schema, sequelize);
  };

  static associate(models) {
    this.hasMany(models.Question, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.hasMany(models.Answer, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};