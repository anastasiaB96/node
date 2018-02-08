'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class Question extends Base {
  static get schema() {
    return Object.assign({}, super.defaultProperties, {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  }

  static init(sequelize) {
    return super.init(this.schema, sequelize);
  };

  static associate(models) {
    this.hasMany(models.Answer, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    this.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
};