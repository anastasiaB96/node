'use strict';

import BaseService from '../helpers/baseService';
import * as tagDALtoDTO from './models/tagDALtoDTO.json';

export default class TagService extends BaseService {
  constructor(mapper, tagRepository) {
    super({ mapper, repository: tagRepository });
  }

  async findAll() {
    return this.wrapError(async () => {
      const result = await super.findAll();

      return result.length ? result.map(question => this.mapper.mapObject(question, tagDALtoDTO)) : null;
    });
  }

  async findById(id) {
    return this.wrapError(async () => {
      const result = await super.findById(id);

      return result ? this.mapper.mapObject(result, tagDALtoDTO) : null;
    });
  }

  async create(info) {
    return this.wrapError(async () => {
      const createdTag = await this.repository.create(info);

      return { id: createdTag.id };
    });
  }
}
