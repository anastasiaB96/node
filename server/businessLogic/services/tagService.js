'use strict';

import AuditableService from './auditableService';
import ERRORS from '../../constants/errors';
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

  async create(userId, tagInfo) {
    try {
      const model = { ...tagInfo, userId };
      const createdTag = await this.repository.create(model);

      return this.resolve({ id: createdTag.id });
    } catch (error) {
      return this.reject({ errorType: ERRORS.internalServer }, error);
    }
  }
}
