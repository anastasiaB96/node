'use strict';

import BaseService from './baseService';

export default class AnswerService extends BaseService {
  constructor(mapper, answerRepository) {
    super(mapper, answerRepository);
  }
}