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

  static async generateHash(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  }

  static async beforeCreate(user) {
    user.password = await User.generateHash(user.password);

    return user;
  }

  static get hooks() {
    return {
      beforeCreate: User.beforeCreate
    }
  }

  static init(sequelize) {
    return super.init(User.schema, { sequelize, hooks: User.hooks });
  };

  static associate({ Question, Answer, Role, Tag }) {
    this.hasMany(Question, {
      as: 'question',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    this.hasMany(Answer, {
      as: 'answer',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    this.hasMany(Tag, {
      as: 'tag',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: null
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

  validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
};