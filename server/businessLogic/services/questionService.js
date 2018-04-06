'use strict';

import BaseService from './baseService';

export default class QuestionService extends BaseService {
  constructor(mapper, questionRepository, answerRepository, userService) {
    super(mapper, questionRepository);
    this.answerRepository = answerRepository;
    this.userService = userService;
  }

  async create({ userId, questionInfo }) {
    try {
      const model = questionInfo;
      model.userId = userId;

      const createdQuestion = await this.repository.create(model);

      return BaseService.resolve(createdQuestion);
    } catch (error) {
      return BaseService.reject(error);
    }
  }

  async createAnswer({ userId, questionId, answerInfo }) {
    try {
      const model = answerInfo;
      model.userId = userId;
      model.questionId = questionId;

      const createdAnswer = await this.answerRepository.create(model);

      return BaseService.resolve(createdAnswer);
    } catch (error) {
      return BaseService.reject(error);
    }
  }
}