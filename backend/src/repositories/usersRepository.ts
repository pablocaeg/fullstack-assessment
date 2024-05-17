import { MongoRepository } from '../database/mongoRepository';
import { User } from '../models/users';
import { WithId } from 'mongodb';

export class UserRepository extends MongoRepository<User> {
  constructor() {
    super('users');
  }

  async findByOrganization(organizationId: number): Promise<WithId<User>[]> {
    return this.findAll({ organizationId });
  }
  
  async findByPassport(passport: number): Promise<User | null> {
    return this.findOne({ passport });
  }

  async findByPhone(phone: number): Promise<User | null> {
    return this.findOne({ phone });
  }
}
