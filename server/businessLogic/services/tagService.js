'use strict';

import AuditableService from './auditableService';
import * as tagDALtoDTO from '../models/tag/tagDALtoDTO.json';

export default class TagService extends AuditableService {
  constructor(errorsHelper, logger, mapper, tagRepository) {
    super({ errorsHelper, logger, mapper, repository: tagRepository });
  }

  async findAll() {
    const result = await super.findAll();
    const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, tagDALtoDTO)) : null;

    return this.resolve(mappedResult);
  }

  async findById(id) {
    const result = await super.findById(id);
    const mappedResult = result ? this.mapper.mapObject(result, tagDALtoDTO) : null;

    return this.resolve(mappedResult);
  }

  async createByUser(userId, info) {
    const createdTag = await super.createByUser(userId, info);

    return this.resolve({ id: createdTag.id });
  }
}
