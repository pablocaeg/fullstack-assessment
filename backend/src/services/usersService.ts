import { User } from '../models/users';
import { UserRepository } from '../repositories/usersRepository';
import { isValidPhoneNumber } from '../utils/readCsv';
import { OrganizationRepository } from '../repositories/organizationsRepository';

const userRepository = new UserRepository();
const organizationRepository = new OrganizationRepository();

export const getAllUsers = async (): Promise<User[]> => {
  return userRepository.findAll();
};

export const getUserByPassport = async (passport: number): Promise<User | null> => {
  return userRepository.findByPassport(passport);
};

export const createUser = async (user: User): Promise<User> => {
  if (typeof user.passport !== 'number' || isNaN(user.passport)) {
    throw new Error('Passport must be a valid number');
  }
  
  const existingUserByPassport = await userRepository.findByPassport(user.passport);
  if (existingUserByPassport) {
    throw new Error('User with this passport already exists.');
  }

  const existingUserByPhone = await userRepository.findByPhone(user.phone);
  if (existingUserByPhone) {
    throw new Error('User with this number already exists.');
  }

  if (!isValidPhoneNumber(user.phone)) {
    throw new Error('Invalid phone number');
  }

  const organizationExists = await organizationRepository.findById(user.organizationId);
  if (!organizationExists) {
    throw new Error('The specified organization does not exist');
  }

  return userRepository.insertOne(user);
};

export const updateUser = async (passport: number, userUpdates: Partial<User>): Promise<User | null> => {
  if (typeof userUpdates.passport !== 'number' || isNaN(userUpdates.passport)) {
    throw new Error('Passport must be a valid number');
  }

  const existingUserByPassport = await userRepository.findByPassport(userUpdates.passport);
  if (existingUserByPassport && userUpdates.passport !== passport) {
    throw new Error('User with this passport already exists.');
  }

  if (userUpdates.phone && !isValidPhoneNumber(userUpdates.phone)) {
    throw new Error('Invalid phone number');
  }

  if (userUpdates.phone) {
    const existingUserByPhone = await userRepository.findByPhone(userUpdates.phone);
    if (existingUserByPhone?.passport !== passport) {
      throw new Error('User with this number already exists.');
    }
  }

  return userRepository.updateOne({ passport }, userUpdates);
};

export const deleteUser = async (passport: number): Promise<boolean> => {
  return userRepository.deleteOne({ passport });
};
