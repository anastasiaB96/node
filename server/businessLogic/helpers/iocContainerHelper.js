'use strict';

import { Lifetime, asValue } from 'awilix';

import { IocContainerHelper as IocContainerDataAccessHelper } from '../../dataAccess/helpers/iocContainerHelper';
import mapper from './mapper';
import modelsValidator from './modelsValidator';

export class IocContainerHelper {
  static _registerHelpers(container) {
    container.register({
      mapper: asValue(mapper),
      modelsValidator: asValue(modelsValidator)
    }, {
      lifetime: Lifetime.SINGLETON
    });
  }

  static registerServices(container) {
    container.loadModules(
      ['**/*Service.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SCOPED
        }
      }
    );

    IocContainerHelper._registerHelpers(container);
    IocContainerDataAccessHelper.registerRepositories(container);
  }
}