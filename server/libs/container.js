import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix';
import logger from './logger';

class Container {
  constructor() {
    this._baseRegisterOptions = {
      cwd: `${__dirname}/..`,
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SCOPED
      }
    };
    this._container = createContainer({ injectionMode: InjectionMode.CLASSIC });
  }

  _configureServices(container) {
    container.loadModules(['businessLogic/services/**/*.js'], this._baseRegisterOptions);
  }

  _configureRepositories(container) {
    const registerOptions = Object.assign({}, this._baseRegisterOptions, {resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }});

    container.loadModules(['dataAccess/repositories/**/*.js'], registerOptions);
  }

  _configureLibs(container) {
    container.register({
      logger: asValue(logger)
    });
  }

  getConfiguredContainer() {
    this._configureServices(this._container);
    this._configureRepositories(this._container);
    this._configureLibs(this._container);

    return this._container;
  }
}

const container = new Container();

export default container;
