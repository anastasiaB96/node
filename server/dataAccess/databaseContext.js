'use strict';

import glob from 'glob';
import path from 'path';
import {
  Sequelize
} from 'sequelize';

const dbConfig = require('./config');

export default class DatabaseContext {
  constructor() {
    this._sequelize = dbConfig.use_env_variable ?
      new Sequelize(process.env[dbConfig.use_env_variable], {
        ssl: true,
        dialectOptions: dbConfig.dialectOptions,
        dialect: dbConfig.dialect,
        protocol: "postgres",
        define: {
          timestamps: true,
          syncOnAssociation: false
        },
        operatorsAliases: dbConfig.operatorsAliases
      }) :
      new Sequelize(
        dbConfig.database,
        dbConfig.username,
        dbConfig.password, {
          dialect: dbConfig.dialect,
          host: dbConfig.host,
          port: dbConfig.port,
          define: {
            timestamps: true,
            syncOnAssociation: false
          },
          operatorsAliases: dbConfig.operatorsAliases
        }
      );
    this.models = this._getModels();
    this._associateModels(this.models);
  }

  _getModels() { // TODO files reading
    const files = glob.sync(path.join(__dirname, '**', '*.js'), {
      absolute: true
    });
    const models = files
      .filter(file => {
        return (file.indexOf('models') !== -1) && (file.indexOf('.') !== -1)
      })
      .map(file => {
        const model = require(file).default;

        return {
          [model.name]: model.init(this._sequelize),
        };
      });

    return Object.assign({}, ...models);
  }

  _associateModels(modelsStore) {
    for (const model of Object.keys(modelsStore)) {
      typeof modelsStore[model].associate === 'function' && modelsStore[model].associate(modelsStore);
    }
  }
}