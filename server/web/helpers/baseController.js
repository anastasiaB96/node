'use strict';

import { get } from 'lodash';
import HttpError from "./httpError";

export default class BaseController {
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

  async wrapError(operation, ctx) {
    try {
      const result = await operation();

      return this.resolve(result);
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  resolve(operationResult) {
    return Promise.resolve(operationResult);
  }

  throwError(ctx, error) {
    const httpError = new HttpError(error);

    return ctx.send(httpError.code, httpError.userMessage);
  }

  async getAll(ctx) {
    return this.wrapError(async () => {
      const result = await this.service.findAll();

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.ok(result);
    }, ctx);
  }

  async getById(ctx) {
    return this.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const result = await this.service.findById(id);

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.ok(result);
    }, ctx);
  }

  async create(ctx) {
    return this.wrapError(async () => {
      const contextBody = this.getContextBody(ctx);
      const createdResult = await this.service.create(contextBody);

      return ctx.created(createdResult);
    }, ctx);
  }

  async updateById(ctx) {
    return this.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const contextBody = this.getContextBody(ctx);

      await this.service.updateById(id, contextBody);

      return ctx.noContent();
    }, ctx);
  }

  async deleteAll(ctx) {
    return this.wrapError(async () => {
      const deletedItems = await this.service.deleteAll();

      return ctx.ok(deletedItems);
    }, ctx);
  }

  async deleteById(ctx) {
    return this.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const deletedItem = await this.service.deleteById(id);

      return ctx.ok(deletedItem);
    }, ctx);
  }
}