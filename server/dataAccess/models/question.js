'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class Question extends Base {
  static get schema() {
    return {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, sequelize);
  };

  static associate({ Answer, User }) {
    this.hasMany(Answer, {
      as: 'answer',
      foreignKey: 'questionId'
    });

    this.belongsTo(User, {
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};