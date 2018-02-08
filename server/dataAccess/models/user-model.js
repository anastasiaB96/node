'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from './base-model';

export default class UserModel extends BaseModel {
  static init(sequelize) {
    return super.init({
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    }, sequelize);
  };

  static associate(models) {
    this.hasMany(models.PostModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.hasMany(models.CommentModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};