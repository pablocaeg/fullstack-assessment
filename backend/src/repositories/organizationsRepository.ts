import { MongoRepository } from '../database/mongoRepository';
import { Organization } from '../models/organizations';

export class OrganizationRepository extends MongoRepository<Organization> {
  constructor() {
    super('organizations');
  }

  async findById(id: number): Promise<Organization | null> {
    return this.findOne({ id });
  }
}
