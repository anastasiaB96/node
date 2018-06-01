'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';
import * as answerDALtoDTO from '../models/answer/answerDALtoDTO.json';

export default class AnswerService extends AuditableService {
  constructor(errorsHelper, logger, mapper, answerRepository, answerVoteService) {
    super({ errorsHelper, logger, mapper, repository: answerRepository });

    this.answerVoteService = answerVoteService;
  }

  async findAll() {
    const result = await super.findAll();
    const mappedResult = result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;

    return this.resolve(mappedResult);
  }

  async findById(id) {
    const result = await super.findById(id);
    const mappedResult = result ? this.mapper.mapObject(result, answerDALtoDTO) : null;

    return this.resolve(mappedResult);
  }

  async find(condition) {
    const result = await super.find(condition);
    const mappedResult = result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;

    return this.resolve(mappedResult);
  }

  async createByUser(userId, info) {
    const createdAnswer = await super.createByUser(userId, info);

    return this.resolve({ id: createdAnswer.id });
  }

  async addVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.create(info);
  }

  async removeVote(userId, questionId) {
    const info = { userId, questionId };

    return this.answerVoteService.delete(info);
  }

  async create(userId, answerInfo) {
    try {
      const model = { ...answerInfo, userId };

      return this.repository.create(model);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}