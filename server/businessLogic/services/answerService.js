'use strict';

import AuditableService from './auditableService';
import * as answerDALtoDTO from '../models/answerDALtoDTO.json';

export default class AnswerService extends AuditableService {
  constructor(errorsHelper, logger, mapper, answerRepository, answerVoteService) {
    super({ errorsHelper, logger, mapper, repository: answerRepository });

    this.answerVoteService = answerVoteService;
  }

  async findAll() {
    const result = await super.findAll();

    this.resolve(result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)));
  }

  async findById(id) {
    const result = await super.findById(id);

    this.resolve(this.mapper.mapObject(result, answerDALtoDTO));
  }

  async find(condition) {
    const result = await super.find(condition);

    this.resolve(this.mapper.mapObject(result, answerDALtoDTO));
  }

  async addVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.create(info);
  }

  async removeVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.delete(info);
  }
}