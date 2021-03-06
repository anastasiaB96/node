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
      },
      rating: {
        type: Sequelize.INTEGER
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, { sequelize });
  };

  static associate({ Answer, User, Tag }) {
    this.hasMany(Answer, {
      as: 'answer',
      foreignKey: 'questionId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    this.belongsTo(User, { as: 'user' });

    this.belongsToMany(Tag, {
      as: 'tag',
      foreignKey: 'questionId',
      through: {
        model: 'QuestionTags',
        unique: false
      }
    });
  }
};