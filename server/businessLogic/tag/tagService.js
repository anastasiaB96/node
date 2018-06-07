'use strict';

import BaseAuditableService from '../helpers/baseAuditableService';
import InternalError from '../helpers/errors/internalError';
import * as tagDALtoDTO from './models/tagDALtoDTO.json';

export default class TagService extends BaseAuditableService {
  constructor(logger, mapper, tagRepository) {
    super({ logger, mapper, repository: tagRepository });
  }

  async findAll() {
    try {
      const result = await super.findAll();
      const mappedResult = result.length ? result.map(question => this.mapper.mapObject(question, tagDALtoDTO)) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async findById(id) {
    try {
      const result = await super.findById(id);
      const mappedResult = result ? this.mapper.mapObject(result, tagDALtoDTO) : null;

      return this.resolve(mappedResult);
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }

  async create(info) {
    try {
      const createdTag = await this.repository.create(info);

      return this.resolve({ id: createdTag.id });
    } catch (error) {
      return this.reject(new InternalError(error));
    }
  }
}
