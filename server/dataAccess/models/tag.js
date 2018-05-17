'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class Tag extends Base {
  static get schema() {
    return {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, { sequelize });
  };

  static associate({ User, Question }) {
    this.belongsTo(User, { as: 'user' });

    this.belongsToMany(Question, {
      as: 'question',
      foreignKey: 'tagId',
      through: {
        model: 'QuestionTags',
        unique: false
      }
    });
  }
};