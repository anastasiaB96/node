'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import Passport from './passport';

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

  _configureLibs(container) {
    container.register({
      logger: asValue(logger)
    });
  }

  _configurePassport(container) {
    container.register({
      passport: asClass(Passport)
    });
  }

  _configureServices(container) {
    container.loadModules(
      ['businessLogic/services/**/*.js', 'businessLogic/externalServices/**/*.js'],
      this._baseResolverOptions
    );
  }

  _configureRepositories(container) {
    const resolverOptions = Object.assign({}, this._baseResolverOptions, {
      resolverOptions: {
        lifetime: Lifetime.SINGLETON
      }
    });

    container.loadModules(['dataAccess/repositories/**/*.js'], resolverOptions);
  }

  getConfiguredContainer() {
    this._configureServices(this._container);
    this._configureRepositories(this._container);
    this._configureLibs(this._container);
    this._configurePassport(this._container);

    return this._container;
  }

  getRegistration(name) {
    return this._container.cradle[name];
  }
}

const container = new Container();

export default container;
