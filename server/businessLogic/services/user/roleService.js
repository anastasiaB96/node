'use strict';

export default class RoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async findByName(name) {
    return this.roleRepository.findBy({ name });
  }
}
