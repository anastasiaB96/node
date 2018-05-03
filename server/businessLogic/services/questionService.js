'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';

export default class QuestionService extends AuditableService {
  constructor(errorsHelper, logger, mapper, questionRepository, answerRepository, userService) {
    super({ errorsHelper, logger, mapper, repository: questionRepository });
    this.answerRepository = answerRepository;
    this.userService = userService;
  }

  async create({ userId, questionInfo }) {
    try {
      const model = questionInfo;
      model.userId = userId;

      const createdQuestion = await this.repository.create(model);

      return this.resolve(createdQuestion);
    } catch (error) {
      return this.reject(ERRORS.internalServer);
    }
  }

  async createAnswer({ userId, questionId, answerInfo }) {
    try {
      const model = answerInfo;
      model.userId = userId;
      model.questionId = questionId;

      const createdAnswer = await this.answerRepository.create(model);

      return this.resolve(createdAnswer);
    } catch (error) {
      return this.reject(ERRORS.internalServer);
    }
  }

  async getAnswers(questionId) {
    try {
      const answers = await this.answerRepository.find({ questionId });

      return this.resolve(answers);
    } catch (error) {
      return this.reject(ERRORS.internalServer);
    }
  }
}