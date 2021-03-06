'use strict';

import { Sequelize } from 'sequelize';
import Base from './base';

export default class QuestionVote extends Base {
  static get schema() {
    return {
      userId: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, { sequelize });
  };
};