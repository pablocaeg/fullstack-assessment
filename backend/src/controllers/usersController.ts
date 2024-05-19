import { Request, Response } from 'express';
import * as usersService from '../services/usersService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const getUserByPassport = async (req: Request, res: Response): Promise<void> => {
  const passport = parseInt(req.params.passport, 10);
  if (isNaN(passport)) {
    res.status(400).send('Invalid passport number');
    return;
  }

  try {
    const user = await usersService.getUserByPassport(passport);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { organizationId, name, surname, passport, phone } = req.body;

  if (!organizationId || !name || !surname ||!passport || !phone) {
    res.status(400).send('Missing required fields: organizationId, name, surname, passport, phone');
    return;
  }

  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const passport = parseInt(req.params.passport, 10);
  if (isNaN(passport)) {
    res.status(400).send('Invalid passport number');
    return;
  }

  try {
    const updatedUser = await usersService.updateUser(passport, req.body); 
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const passport = parseInt(req.params.passport, 10);
  if (isNaN(passport)) {
    res.status(400).send('Invalid passport number');
    return;
  }

  try {
    const success = await usersService.deleteUser(passport);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};
