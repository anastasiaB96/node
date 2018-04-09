'use strict';

import BaseService from './baseService';

export default class AnswerService extends BaseService {
  constructor(errorsHelper, logger, mapper, answerRepository) {
    super({ errorsHelper, logger, mapper, repository: answerRepository });
  }
}