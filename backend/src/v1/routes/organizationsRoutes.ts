import express, { Router } from 'express';
import {
  getOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization
} from '../../controllers/organizationsController';

const router: Router = express.Router();

router.get('/organizations', getOrganizations);
router.get('/organizations/:id', getOrganizationById);
router.post('/organizations', createOrganization);
router.put('/organizations/:id', updateOrganization);
router.delete('/organizations/:id', deleteOrganization);

export default router;
