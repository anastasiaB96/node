'use strict';

import AuditableService from '../helpers/auditableService';
import BadRequestError from '../helpers/errors/badRequestError';
import * as questionWithTagsDALtoDTO from './models/questionWithTagsDALtoDTO.json';
import * as questionDALtoDTO from './models/questionDALtoDTO.json';

export default class QuestionService extends AuditableService {
  constructor(logger, mapper, questionRepository, answerService, questionVoteService, tagService) {
    super({ logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.questionVoteService = questionVoteService;
    this.tagService = tagService;
  }

  async findAll() {
    return this.wrapError(async () => {
      const result = await super.findAll();

      return result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;
    });
  }

  async findById(id) {
    return this.wrapError(async () => {
      const result = await super.findById(id);

      return result ? this.mapper.mapObject(result, questionDALtoDTO) : null;
    });
  }

  async find(condition) {
    return this.wrapError(async () => {
      const result = await super.find(condition);

      return result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;
    });
  }

  async addTagToQuestion(info) {
    return this.wrapError(async () => {
      const tag = await this.tagService.findById(info.tagId);
      const question = await this.repository.findById(info.questionId);

      if (!tag) {
        return Promise.reject(new BadRequestError('Unknown tag id.'));
      }

      if (!question) {
        return Promise.reject(new BadRequestError('Unknown question id.'));
      }

      return this.repository.addTagToQuestion(question, tag);
    });
  }

  async removeTagFromQuestion(info) {
    return this.wrapError(async () => {
      const tag = await this.tagService.findById(info.tagId);
      const question = await this.repository.findById(info.questionId);

      if (!tag) {
        return Promise.reject(new BadRequestError('Unknown tag id.'));
      }

      if (!question) {
        return Promise.reject(new BadRequestError('Unknown question id.'));
      }

      return this.repository.removeTagFromQuestion(question, tag);
    });
  }

  async filterByTags(searchInfo) {
    return this.wrapError(async () => {
      const result = await this.repository.filterByTags(searchInfo);

      return result.map(question => this.mapper.mapObject(question, questionWithTagsDALtoDTO));
    });
  }

  async create(info) {
    return this.wrapError(async () => {
      return this.repository.create(info);
    });
  }

  async createAnswer(info) {
    return this.wrapError(async () => {
      return this.answerService.create(info);
    });
  }

  async getAnswers(questionId) {
    return this.wrapError(async () => {
      return this.answerService.find({ questionId });
    });
  }

  async deleteAllAnswers(questionId) {
    return this.wrapError(async () => {
      return this.answerService.delete({ questionId });
    });
  }

  async calculateRating(questionId) {
    return this.wrapError(async () => {
      const rating = await this.questionVoteService.getRating(questionId);

      return this.repository.setRating(questionId, rating);
    });
  }

  async addVote(info) {
    return this.wrapError(async () => {
      return Promise.all([
        this.questionVoteService.create(info),
        this.calculateRating(info.questionId)
      ]);
    });
  }

  async removeVote(info) {
    return this.wrapError(async () => {
      return Promise.all([
        this.questionVoteService.delete(info),
        this.calculateRating(info.questionId)
      ]);
    });
  }
}