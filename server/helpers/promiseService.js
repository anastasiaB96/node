'use strict';

import HttpError from "../web/helpers/httpError";

export default class PromiseService {
  constructor({ logger }) {
    this.logger = logger;
  }

  async wrapError(operation, ctx) {
    try {
      const result = await operation();

      return this._resolve(result);
    } catch (error) {
      return this._throwError(ctx, error);
    }
  }

  _resolve(operationResult) {
    return Promise.resolve(operationResult);
  }

  _throwError(ctx, error) {
    const httpError = new HttpError(error);

    return ctx.send(httpError.code, httpError.userMessage);
  }
}