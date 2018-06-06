'use strict';

import { Lifetime, asClass } from 'awilix';
import DatabaseContext from '../databaseContext';

export class IocContainerHelper {
  static registerDbContext(container) {
    container.register({
      dbContext: asClass(DatabaseContext, {
        lifetime: Lifetime.SINGLETON
      })
    });
  }

  static registerRepositories(container) {
    container.loadModules(
      ['**/*Repository.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SINGLETON
        }
      }
    );

    IocContainerHelper.registerDbContext(container);
  }
}