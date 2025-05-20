import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getDivingHistory, getDivingHistoryByID } from '../controller/diveHistoryController.js';

const router = express.Router();

router.post('/', userAuth, getDivingHistory);
router.get('/:id', userAuth, getDivingHistoryByID);

export default router;
