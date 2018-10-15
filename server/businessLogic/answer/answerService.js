'use strict';

import AuditableService from '../helpers/auditableService';
import * as answerDALtoDTO from './models/answerDALtoDTO.json';

export default class AnswerService extends AuditableService {
  constructor(logger, mapper, answerRepository, answerVoteService) {
    super({ logger, mapper, repository: answerRepository });

    this.answerVoteService = answerVoteService;
  }

  async findAll() {
    return this.wrapError(async () => {
      const result = await super.findAll();

      return result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;
    });
  }

  async findById(id) {
    return this.wrapError(async () => {
      const result = await super.findById(id);

      return result ? this.mapper.mapObject(result, answerDALtoDTO) : null;
    });
  }

  async find(condition) {
    return this.wrapError(async () => {
      const result = await super.find(condition);

      return result.length ? result.map(answer => this.mapper.mapObject(answer, answerDALtoDTO)) : null;
    });
  }

  async create(userId, answerInfo) {
    return this.wrapError(async () => {
      const model = { ...answerInfo, userId };
      const createdAnswer = await this.repository.create(model);

      return { id: createdAnswer.id };
    });
  }

  async calculateRating(answerId) {
    return this.wrapError(async () => {
      const rating = await this.answerVoteService.getRating(answerId);

      return this.repository.setRating(answerId, rating);
    });
  }

  async addVote(info) {
    return this.wrapError(async () => {
      return Promise.all([
        this.answerVoteService.create(info),
        this.calculateRating(info.answerId)
      ]);
    });
  }

  async removeVote(info) {
    return this.wrapError(async () => {
      return Promise.all([
        this.answerVoteService.delete(info),
        this.calculateRating(info.answerId)
      ]);
    });
  }
}