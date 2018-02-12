'use strict';

import { createContainer, Lifetime, InjectionMode, asValue, asClass } from 'awilix';
import logger from './logger';
import Passport from './passport';
import { IocContainerHelper } from '../businessLogic/helpers/iocContainerHelper';

export default class Container {
  constructor() {
    this.context = this._initContainer();
    this.registrations = this.context.registrations;
  }

  _registerServices(container) {
    IocContainerHelper.registerServices(container);
  }

  _registerLibs(container) {
    container.register({
      logger: asValue(logger),
      passport: asClass(Passport)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  _initContainer() {
    const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
    this._registerServices(container);
    this._registerLibs(container);

    return container;
  }

  getRegistration(name) {
    return this.context.cradle[name];
  }
}
