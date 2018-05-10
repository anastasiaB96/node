'use strict';

import Service from './service';

export default class TagService extends Service {
  constructor(errorsHelper, logger, mapper, tagRepository) {
    super({ errorsHelper, logger, mapper, repository: tagRepository });
  }
}
