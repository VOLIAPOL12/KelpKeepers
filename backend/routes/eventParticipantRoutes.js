import express from 'express';
import { joinDiveEvent, withdrawDiveEvent } from '../controller/eventParticipantController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// 加入活动
router.post('/', userAuth, joinDiveEvent);

// 撤销活动参与（推荐使用 POST）
router.post('/', userAuth, withdrawDiveEvent);

export default router;
