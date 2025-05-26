import express from 'express';
import { joinDiveEvent } from '../controller/eventParticipantController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// 加入活动的路由
router.post('/', userAuth, joinDiveEvent);

export default router;
