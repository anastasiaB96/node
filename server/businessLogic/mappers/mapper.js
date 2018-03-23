'use strict';

import objectMapper from 'object-mapper';

export default class Mapper {
  constructor() {
    this._mapper = objectMapper;
  }

  mapFromTo(object, model) {
    return this._mapper(object, model);
  }
}