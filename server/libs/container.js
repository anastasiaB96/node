import { createContainer, Lifetime, InjectionMode } from 'awilix';
import logger from './logger';

const modulesToLoad = [
  ['businessLogic/services/*.js', Lifetime.SCOPED],
  ['dataAccess/repositories/*.js', Lifetime.SINGLETON]
];

export function configureContainer() {
  const _container = createContainer({ resolutionMode: InjectionMode.CLASSIC });

  return _container
    .loadModules(modulesToLoad, {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase'
    })
    .register({
      logger
    })
}

