'use strict';

import BaseService from './baseService';

export default class TagService extends BaseService {
  constructor(mapper, tagRepository) {
    super(mapper, tagRepository);
  }
}
