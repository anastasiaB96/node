'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import Passport from './passport';
import modelsStore from '../dataAccess/models';

class Container {
  constructor() {
    this._baseResolverOptions = {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SCOPED
      }
    };

    this._init();
  }

  _init() {
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      passport: asClass(Passport)
    });
  }

  _registerServices(container) {
    container.loadModules(
      ['businessLogic/services/**/*.js', 'businessLogic/externalServices/**/*.js'],
      this._baseResolverOptions
    );
  }

  _registerRepositories(container) {
    const resolverOptions = Object.assign({}, this._baseResolverOptions, {
      resolverOptions: {
        lifetime: Lifetime.SINGLETON
      }
    });

    container.loadModules(['dataAccess/repositories/**/*.js'], resolverOptions);
  }

  _registerModels(container) {
    const definedModels = modelsStore.models;

    for (const modelName of Object.keys(definedModels)) {
      container.register({
        [modelName]: asValue(definedModels[modelName])
      });
    }
  }

  getConfiguredContainer() {
    this._registerRepositories(this._container);
    this._registerServices(this._container);
    this._registerModels(this._container);
    this._registerLibs(this._container);

    return this._container;
  }

  getRegistration(name) {
    return this._container.cradle[name];
  }
}

const container = new Container();

export default container;
