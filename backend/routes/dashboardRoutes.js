import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getDashboardData } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/',userAuth, getDashboardData);

export default router;