'use strict';

import objectMapper from 'object-mapper';

class Mapper {
  constructor(mapper) {
    this._mapper = mapper;
  }

  mapObject(object, model) {
    return this._mapper(object, model);
  }
}

export default new Mapper(objectMapper);