'use strict';

import { get } from 'lodash';
import HttpError from './httpError';

export default class Controller {
  constructor(service) {
    this.service = service;
  }

  getContextBody(ctx) {
    return get(ctx.request, 'body');
  }

  getCurrentUserId(ctx) {
    return get(ctx.state, 'jwtData.id');
  }

  getParams(ctx) {
    return ctx.params;
  }

  getQueryParams(ctx) {
    return ctx.query;
  }

  throwError(ctx, error) {
    const httpError = new HttpError(error);

    return ctx.send(httpError.code, httpError.userMessage);
  }

  async getAll(ctx) {
    try {
      const result = await this.service.findAll();

      return ctx.ok(result);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async getById(ctx) {
    try {
      const id = this.getParams(ctx).id;
      const result = await this.service.findById(id);

      return ctx.ok(result);
    } catch (error) {
      this.throwError(ctx, error);
    }
  }

  async create(ctx) {
    try {
      const contextBody = this.getContextBody(ctx);
      const createdResult = await this.service.create(contextBody);

      return ctx.created(createdResult);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async updateById(ctx) {
    try {
      const id = this.getParams(ctx).id;
      const contextBody = this.getContextBody(ctx);

      await this.service.updateById(id, contextBody);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async deleteAll(ctx) {
    try {
      const result = await this.service.deleteAll();

      return ctx.ok(result);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async deleteById(ctx) {
    try {
      const id = this.getParams(ctx).id;
      const result = await this.service.deleteById(id);

      return ctx.ok(result);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }
}