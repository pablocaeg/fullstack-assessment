import express, { Router } from 'express';
import userRoutes from './usersRoutes';
import organizationRoutes from './organizationsRoutes';

const router: Router = express.Router();

router.use(userRoutes);
router.use(organizationRoutes);

export default router;
