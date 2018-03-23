'use strict';

import { Lifetime } from 'awilix';

import { IocContainerHelper as IocContainerDataAccessHelper } from '../../dataAccess/helpers/iocContainerHelper';

export class IocContainerHelper {
  static registerMappers(container) {
    container.loadModules(
      ['mappers/**/*.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SINGLETON
        }
      }
    );
  }

  static registerServices(container) {
    container.loadModules(
      ['services/**/*.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SCOPED
        }
      }
    );

    IocContainerHelper.registerMappers(container);
    IocContainerDataAccessHelper.registerRepositories(container);
  }
}