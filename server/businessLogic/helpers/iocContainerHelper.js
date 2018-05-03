'use strict';

import { Lifetime } from 'awilix';

import { IocContainerHelper as IocContainerDataAccessHelper } from '../../dataAccess/helpers/iocContainerHelper';

export class IocContainerHelper {
  static registerServices(container) {
    container.loadModules(
      ['services/**/*.js', 'helpers/mapper.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SCOPED
        }
      }
    );

    IocContainerDataAccessHelper.registerRepositories(container);
  }
}