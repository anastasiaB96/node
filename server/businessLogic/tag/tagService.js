'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import * as tagDALtoDTO from './models/tagDALtoDTO.json';

export default class TagService extends BaseAuditableService {
  constructor(logger, mapper, tagRepository) {
    super({ logger, mapper, repository: tagRepository });
  }

  async findAll() {
    return this.wrapError(async () => {
      const result = await super.findAll();
      const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, tagDALtoDTO)) : null;

      return this.resolve(mappedResult);
    });
  }

  async findById(id) {
    return this.wrapError(async () => {
      const result = await super.findById(id);
      const mappedResult = result ? this.mapper.mapObject(result, tagDALtoDTO) : null;

      return this.resolve(mappedResult);
    });
  }

  async create(info) {
    return this.wrapError(async () => {
      const createdTag = await this.repository.create(info);

      return this.resolve({ id: createdTag.id });
    });
  }
}
