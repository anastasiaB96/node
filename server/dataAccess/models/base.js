'use strict';

import { Sequelize } from 'sequelize';

export default class Base extends Sequelize.Model {
  static init(schema, sequelize) {
    return super.init(schema, { sequelize });
  }
};