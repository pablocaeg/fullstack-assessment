import { User, users } from '../models/users';
import { isValidPhoneNumber } from '../utils/readCsv';

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserByPassport = (passport: number): User | undefined => {
  return users.find(user => user.passport === passport);
};

export const createUser = (user: User): User => {
  if (users.some(existingUser => existingUser.passport === user.passport)) {
    throw new Error('User with this passport already exists.');
  }
  if (users.some(existingUser => existingUser.phone === user.phone)) {
    throw new Error('User with this number already exists.');
  }
  if (!isValidPhoneNumber(user.phone)) {
    throw new Error('Invalid phone number');
  }
  users.push(user);
  return user;
};

export const updateUser = (passport: number, userUpdates: Partial<User>): User | undefined => {
  const userIndex = users.findIndex(user => user.passport === passport);
  if (userIndex !== -1) {
    if (userUpdates.phone && !isValidPhoneNumber(userUpdates.phone)) {
      throw new Error('Invalid phone number');
    }
    users[userIndex] = { ...users[userIndex], ...userUpdates };
    return users[userIndex];
  }
  return undefined;
};

export const deleteUser = (passport: number): boolean => {
  const userIndex = users.findIndex(user => user.passport === passport);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};
