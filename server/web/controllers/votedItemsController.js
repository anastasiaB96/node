'use strict';

import AuditableController from './auditableController';

export default class VotedItemsController extends AuditableController {
  constructor({ errorsHelper, service }) {
    super({ errorsHelper, service });
  }

  async addVote(ctx) {
    try {
      const votedItemId = this.getParams(ctx).id;
      const userId = this.getCurrentUserId(ctx);
      await this.service.addVote(userId, votedItemId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }

  async removeVote(ctx) {
    try {
      const votedItemId = this.getParams(ctx).id;
      const userId = this.getCurrentUserId(ctx);
      await this.service.removeVote(userId, votedItemId);

      return ctx.noContent();
    } catch (error) {
      return this.throwError(ctx, error);
    }
  }
}
