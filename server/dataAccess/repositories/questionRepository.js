'use strict';

import BaseRepository from './baseRepository';

export default class QuestionRepository extends BaseRepository {
  constructor(logger, dbContext) {
    super(logger, dbContext, 'Question');
  }
}