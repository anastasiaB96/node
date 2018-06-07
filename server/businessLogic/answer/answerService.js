'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import InternalError from '../helpers/errors/internalError';
import * as answerDALtoDTO from './models/answerDALtoDTO.json';

export default class AnswerService extends BaseAuditableService {
  constructor(logger, mapper, answerRepository, answerVoteService) {
    super({ logger, mapper, repository: answerRepository });

    this.answerVoteService = answerVoteService;
  }

  async findAll() {
    try {
      const result = await super.findAll();
      const mappedResult = result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findById(id) {
    try {
      const result = await super.findById(id);
      const mappedResult = result ? this.mapper.mapObject(result, answerDALtoDTO) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async find(condition) {
    try {
      const result = await super.find(condition);
      const mappedResult = result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async create(userId, answerInfo) {
    try {
      const model = { ...answerInfo, userId };
      const createdAnswer = await this.repository.create(model);

      return this.resolve({ id: createdAnswer.id });
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async calculateRating(answerId) {
    try {
      const rating = await this.answerVoteService.getRating(answerId);

      return this.repository.setRating(answerId, rating);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async addVote(info) {
    return Promise.all([
      this.answerVoteService.create(info),
      this.calculateRating(info.answerId)
    ]);
  }

  async removeVote(info) {
    return Promise.all([
      this.answerVoteService.delete(info),
      this.calculateRating(info.answerId)
    ]);
  }
}