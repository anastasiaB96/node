'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import passport from './passport';
import { IocContainerHelper } from '../businessLogic/helpers/iocContainerHelper';

export default class Container {
  constructor() {
    this.context = this._initContainer();
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      passport: asClass(passport)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  _registerServices(container) {
    IocContainerHelper.registerServices(container);
  }

  _initContainer() {
    const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this._registerLibs(container);
    this._registerServices(container);

    return container;
  }

  getRegistration(name) {
    return this.context.cradle[name];
  }
}
