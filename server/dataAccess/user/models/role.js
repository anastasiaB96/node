'use strict';

import { Sequelize } from 'sequelize';
import BaseModel from '../../helpers/baseModel';

export default class Role extends BaseModel {
  static get schema() {
    return {
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      }
    };
  }

  static init(sequelize) {
    return super.init(this.schema, { sequelize });
  };

  static associate({ User }) {
    this.belongsToMany(User, {
      as: 'user',
      foreignKey: 'roleId',
      through: {
        model: 'UserRoles',
        unique: false
      }
    });
  }
};