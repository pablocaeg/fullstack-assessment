import express, { Router } from 'express';
import {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} from '../../controllers/organizationsController';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management
 */

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     responses:
 *       200:
 *         description: List of organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 */
router.get('/organizations', getOrganizations);

/**
 * @swagger
 * /organizations/{id}:
 *   get:
 *     summary: Get an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organization ID
 *     responses:
 *       200:
 *         description: The organization description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organization not found
 */
router.get('/organizations/:id', getOrganizationById);

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: The created organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Bad request
 */
router.post('/organizations', createOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *     summary: Update an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organization ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: The updated organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Organization not found
 */
router.put('/organizations/:id', updateOrganization);

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete an organization by ID
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organization ID
 *     responses:
 *       204:
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */
router.delete('/organizations/:id', deleteOrganization);

export default router;
