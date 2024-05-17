import { MongoRepository } from '../database/mongoRepository';
import { User } from '../models/users';

export class UserRepository extends MongoRepository<User> {
  constructor() {
    super('users');
  }

  async findByPassport(passport: number): Promise<User | null> {
    return this.findOne({ passport });
  }

  async findByPhone(phone: number): Promise<User | null> {
    return this.findOne({ phone });
  }
}
