'use strict';

import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix';
import logger from './logger';

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

  _configureServices(container) {
    container.loadModules([
      'businessLogic/services/**/*.js',
      'businessLogic/externalServices/**/*.js'
    ], this._baseResolverOptions);
  }

  _configureRepositories(container) {
    const resolverOptions = Object.assign({}, this._baseResolverOptions, {resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }});

    container.loadModules(['dataAccess/repositories/**/*.js'], resolverOptions);
  }

  _configureLibs(container) {
    container.register({
      logger: asValue(logger)
    });
  }

  getConfiguredContainer() {
    this._configureServices(this._container);
    this._configureRepositories(this._container);
    this._configureLibs(this._container);

    return this._container;
  }
}

const container = new Container();

export default container;
