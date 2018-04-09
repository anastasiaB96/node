'use strict';

import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix';
import logger from './logger';
import errorsHelper from './errorsHelper';
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
      errorsHelper: asValue(errorsHelper)
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
