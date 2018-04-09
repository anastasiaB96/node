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

  async updateById(ctx) {
    try {
      const id = BaseController.getParams(ctx).id;
      const contextBody = BaseController.getContextBody(ctx);
      const updated = await this.service.updateById(contextBody, id);

      ctx.ok(updated);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async deleteAll(ctx) {
    try {
      const result = await this.service.deleteAll();

      ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async deleteById(ctx) {
    try {
      const id = BaseController.getParams(ctx).id;
      const result = await this.service.deleteById(id);

      ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }
}