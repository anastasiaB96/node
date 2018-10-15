'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import PromiseService from './promiseService'
import { IocContainerHelper as IocContainerBusinessLayerHelper } from '../businessLogic/helpers/iocContainerHelper';

class IocContainerHelper {
  constructor() {
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this._registerHelpers(this._container);
    this._registerBusinessLayer(this._container);
  }

  _registerHelpers(container) {
    container.register({
      logger: asValue(logger),
      promiseService: asClass(PromiseService)
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

export default new IocContainerHelper();
