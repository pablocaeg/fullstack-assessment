import { UserRepository } from '../src/repositories/usersRepository';
import { OrganizationRepository } from '../src/repositories/organizationsRepository';
import * as mocha from 'mocha';

const userRepository = new UserRepository();
const organizationRepository = new OrganizationRepository();

mocha.beforeEach(async () => {
  await organizationRepository.insertOne({ id: 1, name: 'Test Org', description: 'Test Org Description' });
  await userRepository.insertOne({ passport: 123456789, name: 'Test', surname: 'User', organizationId: 1, phone: 644199790 });
});

mocha.afterEach(async () => {
  await userRepository.deleteOne({ passport: 123456789 });
  await organizationRepository.deleteOne({ id: 1 });
});
