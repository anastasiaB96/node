'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class AnswerVote extends Base {
  static get schema() {
    return {
      userId: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      answerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, { sequelize });
  };
};