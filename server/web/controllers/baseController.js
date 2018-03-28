'use strict';

import { get } from 'lodash';

export default class BaseController {
  constructor(logger, service) {
    this.logger = logger;
    this.service = service;
  }

  static getContextBody(ctx) {
    return get(ctx.request, 'body');
  }

  static getUserId(ctx) {
    return get(ctx.state, 'jwtData.id');
  }

  static getParams(ctx) {
    return ctx.params;
  }

  async getAll(ctx) {
    try {
      const data = await this.service.findAll();

      ctx.send(200, data);
    } catch (error) {
      ctx.send(500, error);
    }
  }

  async getById(ctx) {
    try {
      const id = BaseController.getParams(ctx).id;
      const data = await this.service.findById(id);

      ctx.send(200, data);
    } catch (error) {
      ctx.send(500, error);
    }
  }

  async create(ctx) {
    try {
      const contextBody = BaseController.getContextBody(ctx);
      const created = await this.service.create(contextBody);

      ctx.created(created);
    } catch (error) {
      ctx.send(500, error);
    }
  }

  async update() {

  }

  async deleteAll(ctx) {

  }

  async deleteById(ctx) {

  }
}