'use strict';

import { Lifetime, asClass } from 'awilix';
import DatabaseContext from '../models';

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
      ['repositories/**/*.js'],
      {
        cwd: `${__dirname}/..`,
        formatName: 'camelCase',
        resolverOptions: {
          lifetime: Lifetime.SINGLETON
        }
      }
    );

    this.registerDbContext(container);
  }
}