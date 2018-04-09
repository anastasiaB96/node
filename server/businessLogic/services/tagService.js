'use strict';

import BaseService from './baseService';

export default class TagService extends BaseService {
  constructor(errorsHelper, logger, mapper, tagRepository) {
    super({ errorsHelper, logger, mapper, repository: tagRepository });
  }
}
