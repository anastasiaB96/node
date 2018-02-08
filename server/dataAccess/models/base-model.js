'use strict';

import { Sequelize } from 'sequelize';

export default class BaseModel extends Sequelize.Model {
  static init(schema, sequelize) {
    return super.init(schema, { sequelize });
  }
};