'use strict';

import { get } from 'lodash';

export default class Controller {
  constructor(service, promiseService) {
    this.service = service;
    this.promiseService = promiseService;
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

  async getAll(ctx) {
    return this.promiseService.wrapError(async () => {
      const result = await this.service.findAll();

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.ok(result);
    }, ctx);
  }

  async getById(ctx) {
    return this.promiseService.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const result = await this.service.findById(id);

      if (!result.length) {
        return ctx.notFound();
      }

      return ctx.ok(result);
    }, ctx);
  }

  async create(ctx) {
    return this.promiseService.wrapError(async () => {
      const contextBody = this.getContextBody(ctx);
      const createdResult = await this.service.create(contextBody);

      return ctx.created(createdResult);
    }, ctx);
  }

  async updateById(ctx) {
    return this.promiseService.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const contextBody = this.getContextBody(ctx);

      await this.service.updateById(id, contextBody);

      return ctx.noContent();
    }, ctx);
  }

  async deleteAll(ctx) {
    return this.promiseService.wrapError(async () => {
      const deletedItems = await this.service.deleteAll();

      return ctx.ok(deletedItems);
    }, ctx);
  }

  async deleteById(ctx) {
    return this.promiseService.wrapError(async () => {
      const id = this.getParams(ctx).id;
      const deletedItem = await this.service.deleteById(id);

      return ctx.ok(deletedItem);
    }, ctx);
  }
}