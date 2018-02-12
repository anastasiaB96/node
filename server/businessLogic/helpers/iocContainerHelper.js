'use strict';

import { Lifetime } from 'awilix';

export class IocContainerHelper {
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
  }
}