'use strict';

import { get } from 'lodash';

export default class Controller {
  constructor({ errorsHelper, service }) {
    this.service = service;
    this.errorsHelper = errorsHelper;
  }

  getContextBody(ctx) {
    return get(ctx.request, 'body');
  }

  getLoggedUserId(ctx) {
    return get(ctx.state, 'jwtData.id');
  }

  getParams(ctx) {
    return ctx.params;
  }

  throwError(ctx, errorName) {
    const error = this.errorsHelper.getHttpErrorInfo(errorName);

    ctx.send(error.code, error.userMessage);
  }

  async getAll(ctx) {
    try {
      const result = await this.service.findAll();

      ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async getById(ctx) {
    try {
      const id = this.getParams(ctx).id;
      const result = await this.service.findById(id);

      ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async create(ctx) {
    try {
      const contextBody = this.getContextBody(ctx);
      const createdResult = await this.service.create(contextBody);

      ctx.created(createdResult);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async updateById(ctx) {
    try {
      const id = this.getParams(ctx).id;
      const contextBody = this.getContextBody(ctx);
      const updatedResult = await this.service.updateById(contextBody, id);

      ctx.ok(updatedResult);
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
      const id = this.getParams(ctx).id;
      const result = await this.service.deleteById(id);

      ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }
}