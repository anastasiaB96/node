'use strict';

import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import Base from './base';

export default class User extends Base {
  static get schema() {
    return {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      }
    };
  }

  static beforeCreate(user) {
    return User.generateHash(user.password).then(hashedPassword => {
      user.password = hashedPassword;
    });
  }

  static get hooks() {
    return {
      beforeCreate: User.beforeCreate
    }
  }

  static init(sequelize) {
    return super.init(User.schema, { sequelize, hooks: User.hooks });
  };

  static associate({ Question, Answer, Role }) {
    this.hasMany(Question, {
      as: 'question',
      foreignKey: 'userId'
    });

    this.hasMany(Answer, {
      as: 'answer',
      foreignKey: 'userId'
    });

    this.belongsToMany(Role, {
      as: 'role',
      foreignKey: 'userId',
      through: {
        model: 'UserRoles',
        unique: false
      }
    });
  }

  static generateHash(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  }

  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
};