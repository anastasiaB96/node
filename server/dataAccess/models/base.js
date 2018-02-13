'use strict';

import { Sequelize } from 'sequelize';

export default class Base extends Sequelize.Model {
  static init(schema, options) {
    return super.init(schema, options);
  }
};