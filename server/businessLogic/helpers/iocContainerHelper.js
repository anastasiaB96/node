'use strict';

import { Lifetime, asValue } from 'awilix';

import { IocContainerHelper as IocContainerDataAccessHelper } from '../../dataAccess/helpers/iocContainerHelper';
import mapper from './mapper';

export class IocContainerHelper {
  static _registerMapper(container) {
    container.register({
      mapper: asValue(mapper)
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

    IocContainerHelper._registerMapper(container);
    IocContainerDataAccessHelper.registerRepositories(container);
  }
}