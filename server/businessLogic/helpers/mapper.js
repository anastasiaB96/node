'use strict';

import objectMapper from 'object-mapper';

class Mapper {
  constructor() {
    this._mapper = objectMapper;
  }

  mapObject(object, model) {
    return this._mapper(object, model);
  }
}

export default new Mapper();