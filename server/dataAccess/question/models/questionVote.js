'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from '../../helpers/baseModel';

export default class QuestionVote extends BaseModel {
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