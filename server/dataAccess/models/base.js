'use strict';

import { Sequelize } from 'sequelize';

export default class Base extends Sequelize.Model {
  static get idProperty() {
    return {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    }
  }

  static get dateProperty() {
    return {
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }
  }

  static get defaultProperties() {
    return Object.assign({}, this.idProperty, this.dateProperty);
  }

  static init(schema, sequelize) {
    return super.init(schema, { sequelize });
  }
};