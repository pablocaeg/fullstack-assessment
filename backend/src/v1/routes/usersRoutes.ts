import express, { Router } from 'express';
import {
  getUsers,
  getUserByPassport,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/usersController';

const router: Router = express.Router();

router.get('/users', getUsers);
router.get('/users/:passport', getUserByPassport);
router.post('/users', createUser);
router.put('/users/:passport', updateUser);
router.delete('/users/:passport', deleteUser);

export default router;
