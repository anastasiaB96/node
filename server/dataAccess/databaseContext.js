'use strict';

import glob from 'glob';
import { Sequelize } from 'sequelize';
import dbConfig from './config';
import config from 'config';

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

    this.models = this._getModels();
    this._associateModels(this.models);
  }

  _getModels() { // TODO files reading
    const rootDirectory = config.get('rootDirectory');
    const files = glob.sync(`${rootDirectory}/dataAccess/**/*.js`, { absolute: true });
    const models = files
      .filter(file => {
        return (file.indexOf('models') !== -1) && (file.indexOf('.') !== -1)
      })
      .map(file => {
        const model = require(file.replace(`${rootDirectory}\\dataAccess\\`, '')).default;
        console.log(model);

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
