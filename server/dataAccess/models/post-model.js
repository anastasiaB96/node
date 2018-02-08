'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from './base-model';

export default class PostModel extends BaseModel {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      assets: {
        type: Sequelize.JSON,
        allowNull: true
      },
    }, sequelize);
  };

  static associate(models) {
    this.hasMany(models.CommentModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.belongsTo(models.UserModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};