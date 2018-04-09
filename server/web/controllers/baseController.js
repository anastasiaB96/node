'use strict';

import { get } from 'lodash';

export default class BaseController {
  constructor({ errorsHelper, service }) {
    this.service = service;
    this.errorsHelper = errorsHelper;
  }

  static getContextBody(ctx) {
    return get(ctx.request, 'body');
  }

  static getLoggedUserId(ctx) {
    return get(ctx.state, 'jwtData.id');
  }

  static getParams(ctx) {
    return ctx.params;
  }

  throwError(ctx, errorName) {
    const error = this.errorsHelper.getHttpErrorInfo(errorName);
    ctx.send(error.code, error.userMessage);
  }

  async getAll(ctx) {
    try {
      const data = await this.service.findAll();

      ctx.ok(data);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async getById(ctx) {
    try {
      const id = BaseController.getParams(ctx).id;
      const data = await this.service.findById(id);

      ctx.ok(data);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async create(ctx) {
    try {
      const contextBody = BaseController.getContextBody(ctx);
      const created = await this.service.create(contextBody);

      ctx.created(created);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async update() {

  }

  async deleteAll(ctx) {

  }

  async deleteById(ctx) {

  }
}