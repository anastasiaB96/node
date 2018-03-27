'use strict';

import BaseRepository from './baseRepository';

export default class AnswerRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super(logger, dbContext, 'Answer');
  }
}