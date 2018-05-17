'use strict';

import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix';
import logger from './logger';
import errorsHelper from './errorsHelper';
import { IocContainerHelper as IocContainerBusinessLayerHelper } from '../businessLogic/helpers/iocContainerHelper';

class IocContainerHelper {
  constructor() {
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this._registerLibs(this._container);
    this._registerBusinessLayer(this._container);
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      errorsHelper: asValue(errorsHelper)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  _registerBusinessLayer(container) {
    IocContainerBusinessLayerHelper.registerServices(container);
  }

  getRegisteredContainer() {
    return this._container;
  }
}

const iocContainerHelper = new IocContainerHelper();

export default iocContainerHelper;
