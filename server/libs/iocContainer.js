'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import Passport from './passport';
import { IocContainerHelper } from '../businessLogic/helpers/iocContainerHelper';

class IocContainer {
  constructor() {
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this._registerLibs(this._container);
    this._registerServices(this._container);
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      passport: asClass(Passport)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  _registerServices(container) {
    IocContainerHelper.registerServices(container);
  }

  getRegisteredContainer() {
    return this._container;
  }
}

export default new IocContainer();
