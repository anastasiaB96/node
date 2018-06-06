'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import ERRORS from '../../constants/errors';
import * as questionWithTagsDALtoDTO from './models/questionWithTagsDALtoDTO.json';
import * as questionDALtoDTO from './models/questionDALtoDTO.json';

export default class QuestionService extends BaseAuditableService {
  constructor(errorsHelper, logger, mapper, questionRepository, answerService, userService, questionVoteService, tagService) {
    super({ errorsHelper, logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.userService = userService;
    this.questionVoteService = questionVoteService;
    this.tagService = tagService;
  }

  async findAll() {
    const result = await super.findAll();
    const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;

    return this.resolve(mappedResult);
  }

  async findById(id) {
    const result = await super.findById(id);
    const mappedResult = result ? this.mapper.mapObject(result, questionDALtoDTO) : null;

    return this.resolve(mappedResult);
  }

  async find(condition) {
    const result = await super.find(condition);
    const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, questionDALtoDTO)) : null;

    return this.resolve(mappedResult);
  }

  async createByUser(userId, info) {
    const createdQuestion = await super.createByUser(userId, info);

    return this.resolve({ id: createdQuestion.id });
  }

  async addTagToQuestion(questionId, tagId) {
    try {
      const tag = await this.tagService.findById(tagId);
      const question = await this.repository.findById(questionId);

      if (!tag) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown tag id.' });
      }

      if (!question) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown question id.' });
      }

      return this.repository.addTagToQuestion(question, tag);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async removeTagFromQuestion(questionId, tagId) {
    try {
      const tag = await this.tagService.findById(tagId);
      const question = await this.repository.findById(questionId);

      if (!tag) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown tag id.' });
      }

      if (!question) {
        return this.reject({ errorType: ERRORS.notFound, errorMessage: 'Unknown question id.' });
      }

      return this.repository.removeTagFromQuestion(question, tag);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async filterByTags(searchInfo) {
    try {
      const result = await this.repository.filterByTags(searchInfo);

      return this.resolve(result.map(question => this.mapper.mapObject(question, questionWithTagsDALtoDTO)));
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async create(userId, questionInfo) {
    try {
      const model = { ...questionInfo, userId };

      return this.repository.create(model);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async createAnswer(userId, info) {
    try {
      return this.answerService.create(userId, info);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async getAnswers(questionId) {
    try {
      return this.answerService.find({ questionId });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async deleteAllAnswers(questionId) {
    try {
      return this.answerService.delete({ questionId });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async calculateRating(questionId) {
    try {
      const rating = await this.questionVoteService.getRating(questionId);

      return this.repository.setRating(questionId, rating);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async addVote(userId, questionId) {
    try {
      const info = { userId, questionId };

      return Promise.all([
        this.questionVoteService.create(info),
        this.calculateRating(questionId)
      ]);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }

  async removeVote(userId, questionId) {
    try {
      const info = { userId, questionId };

      return Promise.all([
        this.questionVoteService.delete(info),
        this.calculateRating(questionId)
      ]);
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}