'use strict';

import AuditableService from './auditableService';

export default class TagService extends AuditableService {
  constructor(errorsHelper, logger, mapper, tagRepository) {
    super({ errorsHelper, logger, mapper, repository: tagRepository });
  }
}
