import express from 'express';
import { joinDiveEvent } from '../controller/eventParticipantController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

router.post('/', userAuth, joinDiveEvent);

export default router;