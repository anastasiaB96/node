'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import InternalError from '../helpers/errors/internalError';
import BadRequestError from '../helpers/errors/badRequestError';
import * as questionWithTagsDALtoDTO from './models/questionWithTagsDALtoDTO.json';
import * as questionDALtoDTO from './models/questionDALtoDTO.json';

export default class QuestionService extends BaseAuditableService {
  constructor(logger, mapper, questionRepository, answerService, userService, questionVoteService, tagService) {
    super({ logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.userService = userService;
    this.questionVoteService = questionVoteService;
    this.tagService = tagService;
  }

  async findAll() {
    try {
      const result = await super.findAll();
      const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findById(id) {
    try {
      const result = await super.findById(id);
      const mappedResult = result ? this.mapper.mapObject(result, questionDALtoDTO) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async find(condition) {
    try {
      const result = await super.find(condition);
      const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async addTagToQuestion(info) {
    try {
      const tag = await this.tagService.findById(info.tagId);
      const question = await this.repository.findById(info.questionId);

      if (!tag) {
        return this.reject(new BadRequestError('Unknown tag id.'));
      }

      if (!question) {
        return this.reject(new BadRequestError('Unknown question id.'));
      }

      return this.repository.addTagToQuestion(question, tag);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async removeTagFromQuestion(info) {
    try {
      const tag = await this.tagService.findById(info.tagId);
      const question = await this.repository.findById(info.questionId);

      if (!tag) {
        return this.reject(new BadRequestError('Unknown tag id.'));
      }

      if (!question) {
        return this.reject(new BadRequestError('Unknown question id.'));
      }

      return this.repository.removeTagFromQuestion(question, tag);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async filterByTags(searchInfo) {
    try {
      const result = await this.repository.filterByTags(searchInfo);

      return this.resolve(result.map(question => this.mapper.mapObject(question, questionWithTagsDALtoDTO)));
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async create(info) {
    try {
      return this.repository.create(info);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async createAnswer(info) {
    try {
      return this.answerService.create(info);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async getAnswers(questionId) {
    try {
      return this.answerService.find({ questionId });
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async deleteAllAnswers(questionId) {
    try {
      return this.answerService.delete({ questionId });
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async calculateRating(questionId) {
    try {
      const rating = await this.questionVoteService.getRating(questionId);

      return this.repository.setRating(questionId, rating);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async addVote(info) {
    try {
      return Promise.all([
        this.questionVoteService.create(info),
        this.calculateRating(info.questionId)
      ]);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async removeVote(info) {
    try {
      return Promise.all([
        this.questionVoteService.delete(info),
        this.calculateRating(info.questionId)
      ]);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}