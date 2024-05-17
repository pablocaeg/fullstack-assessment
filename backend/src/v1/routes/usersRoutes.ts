import express, { Router } from 'express';
import {
  getUsers,
  getUserByPassport,
  createUser,
  updateUser,
  deleteUser
} from '../../controllers/usersController';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /users/{passport}:
 *   get:
 *     summary: Get a user by passport
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: passport
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's passport number
 *     responses:
 *       200:
 *         description: The user details by passport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/users/:passport', getUserByPassport);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post('/users', createUser);

/**
 * @swagger
 * /users/{passport}:
 *   put:
 *     summary: Update a user by passport
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: passport
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's passport number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put('/users/:passport', updateUser);

/**
 * @swagger
 * /users/{passport}:
 *   delete:
 *     summary: Delete a user by passport
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: passport
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's passport number
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:passport', deleteUser);

export default router;
