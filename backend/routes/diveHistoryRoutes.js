import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getDivingHistory } from '../controller/diveHistoryController.js';

const router = express.Router();

router.post('/', userAuth, getDivingHistory);

export default router;
