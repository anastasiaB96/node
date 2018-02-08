'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from './base-model';

export default class CommentModel extends BaseModel {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    }, sequelize);
  };

  static associate(models) {
    this.belongsTo(models.UserModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.belongsTo(models.PostModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};