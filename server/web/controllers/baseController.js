'use strict';

import { get } from 'lodash';

export default class BaseController {
  constructor(logger) {
    this.logger = logger;
  }

  getContextBody(ctx) {
    return get(ctx.request, 'body');
  }
}