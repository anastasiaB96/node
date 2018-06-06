'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from '../../helpers/baseModel';

export default class Tag extends BaseModel {
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