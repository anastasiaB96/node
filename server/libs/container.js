'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import Passport from './passport';
import { IocContainerHelper as IocBusinessHelper } from '../businessLogic/helpers/iocContainerHelper';
import { IocContainerHelper as IocDataAccessHelper } from '../dataAccess/helpers/iocContainerHelper';

class Container {
  constructor() {
    this._init();
  }

  _init() {
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
  }

  _registerServices(container) {
    IocBusinessHelper.registerServices(container);
  }

  _registerRepositories(container) {
    IocDataAccessHelper.registerRepositories(container);
  }

  _registerDbContext(container) {
    IocDataAccessHelper.registerDbContext(container);
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      passport: asClass(Passport)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  getConfiguredContainer() {
    this._registerServices(this._container);
    this._registerRepositories(this._container);
    this._registerDbContext(this._container);
    this._registerLibs(this._container);

    return this._container;
  }

  getRegistration(name) {
    return this._container.cradle[name];
  }
}

const container = new Container();

export default container;
