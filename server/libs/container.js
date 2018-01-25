import { createContainer, Lifetime, InjectionMode } from 'awilix';
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
    this._container = createContainer({ resolutionMode: InjectionMode.CLASSIC });
  }

  _registerServices(container) {
    container.loadModules(['businessLogic/services/**/*.js'], this._baseRegisterOptions);
  }

  _registerRepositories(container) {
    const registerOptions = Object.assign({}, this._baseRegisterOptions, {resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }});

    container.loadModules(['dataAccess/repositories/**/*.js'], registerOptions);
  }

  _registerLibs(container) {
    container.register({ logger });
  }

  register() {
    this._registerServices(this._container);
    this._registerRepositories(this._container);
    this._registerLibs(this._container);

    return this._container;
  }
}

const container = new Container();

export default container;
