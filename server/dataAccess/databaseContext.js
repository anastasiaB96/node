'use strict';

import path from 'path';
import Glob from 'glob-fs';
import { Sequelize } from 'sequelize';
import dbConfig from './config';

export default class DatabaseContext {
  constructor() {
    this._glob = new Glob();

    this._sequelize = new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        dialect: dbConfig.dialect,
        host: dbConfig.host,
        port: dbConfig.port,
        define: {
          timestamps: true,
          syncOnAssociation: false
        }
      }
    );

    this.models = this._getModels();
    this._associateModels(this.models);
  }

  _getModels() { // TODO files reading
    const files = this._glob.readdirSync('server/dataAccess/**/*.js');
    const models = files
      .filter(file => {
        return (file.indexOf('models') !== -1) && (file.indexOf('.') !== -1)
      })
      .map(file => {
        const model = require(path.join(__dirname, file.replace('server\\dataAccess\\', ''))).default;

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
