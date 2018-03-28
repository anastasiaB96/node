'use strict';

import BaseService from './baseService';

export default class QuestionService extends BaseService {
  constructor(mapper, questionRepository, userService) {
    super(mapper, questionRepository);
    this.userService = userService;
  }

  async create(userId, questionInfo) {
    try {
      const user = await this.userService.findById(userId);

      if (!user) {
        return BaseService.reject('User doesn\'t exist');
      }

      const createdQuestion = await user.createQuestion(questionInfo);

      return BaseService.resolve(createdQuestion);
    } catch (error) {
      return BaseService.reject(error);
    }
  }
}