import { MongoRepository } from '../database/mongoRepository';
import { Organization } from '../models/organizations';
import { User } from '../models/users';
import { UserRepository } from './usersRepository';
import { WithId } from 'mongodb';

export class OrganizationRepository extends MongoRepository<Organization> {
  private userRepository: UserRepository;

  constructor() {
    super('organizations');
    this.userRepository = new UserRepository();  // Create an instance of UserRepository
  }

  async findById(id: number): Promise<WithId<Organization> & { users: WithId<User>[] } | null> {
    const organization = await this.findOne({ id });
    if (!organization) return null;

    const users = await this.userRepository.findByOrganization(id);

    return { ...organization, users };
  }
}
