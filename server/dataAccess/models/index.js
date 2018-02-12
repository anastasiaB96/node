'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dbConfig from '../config';

export default class DatabaseContext {
  constructor() {
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

    this.models = this._getDefinedModels();
    this._associateModels(this.models);
  }

  _getDefinedModels() {
    const self = this;

    return Object.assign({}, ...fs.readdirSync(__dirname)
      .filter(file =>
        (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'base.js')
      )
      .map(function (file) {
        const model = require(path.join(__dirname, file)).default;

        return {
          [model.name]: model.init(self._sequelize),
        };
      })
    );
  }

  _associateModels(modelsStore) {
    for (const model of Object.keys(modelsStore)) {
      typeof modelsStore[model].associate === 'function' && modelsStore[model].associate(modelsStore);
    }
  }
}
