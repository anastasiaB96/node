'use strict';

import AuditableService from './auditableService';

export default class AnswerService extends AuditableService {
  constructor(errorsHelper, logger, mapper, answerRepository) {
    super({ errorsHelper, logger, mapper, repository: answerRepository });
  }
}