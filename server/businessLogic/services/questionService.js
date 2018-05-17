'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';
import * as questionWithTagsDALtoDTO from '../models/question/questionWithTagsDALtoDTO.json';
import * as questionDALtoDTO from '../models/question/questionDALtoDTO.json';

export default class QuestionService extends AuditableService {
  constructor(errorsHelper, logger, mapper, questionRepository, answerService, userService, questionVoteService, tagService) {
    super({ errorsHelper, logger, mapper, repository: questionRepository });

    this.answerService = answerService;
    this.userService = userService;
    this.questionVoteService = questionVoteService;
    this.tagService = tagService;
  }

  async findAll() {
    const result = await super.findAll();

    return this.resolve(result.map(question => this.mapper.mapObject(question, questionDALtoDTO)));
  }

  async findById(id) {
    const result = await super.findById(id);

    return this.resolve(this.mapper.mapObject(result, questionDALtoDTO));
  }

  async find(condition) {
    const result = await super.find(condition);

    return this.resolve(result.map(question => this.mapper.mapObject(question, questionDALtoDTO)));
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

  async createAnswer(userId, info) {
    try {
      return this.answerService.createByUser(userId, info);
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

  async addVote(userId, questionId) {
    const info = { userId, questionId };

    return this.questionVoteService.create(info);
  }

  async removeVote(userId, questionId) {
    const info = { userId, questionId };

    return this.questionVoteService.delete(info);
  }
}