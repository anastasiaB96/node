'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import ERRORS from '../../constants/errors';
import * as answerDALtoDTO from './models/answerDALtoDTO.json';

export default class AnswerService extends BaseAuditableService {
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

  async create(userId, answerInfo) {
    try {
      const model = { ...answerInfo, userId };
      const createdAnswer = await this.repository.create(model);

      return this.resolve({ id: createdAnswer.id });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async calculateRating(answerId) {
    try {
      const rating = await this.answerVoteService.getRating(answerId);

      return this.repository.setRating(answerId, rating);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async addVote(userId, answerId) {
    const info = { userId, answerId };

    return Promise.all([
      this.answerVoteService.create(info),
      this.calculateRating(answerId)
    ]);
  }

  async removeVote(userId, answerId) {
    const info = { userId, answerId };

    return Promise.all([
      this.answerVoteService.delete(info),
      this.calculateRating(answerId)
    ]);
  }
}