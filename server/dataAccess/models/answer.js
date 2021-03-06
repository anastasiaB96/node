'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class Answer extends Base {
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