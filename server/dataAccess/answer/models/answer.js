'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from '../../helpers/baseModel';

export default class Answer extends BaseModel {
  static get schema() {
    return {
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

  static associate({ User, Question }) {
    this.belongsTo(User, { as: 'user' });

    this.belongsTo(Question, { as: 'question' });
  }
};