import express from 'express';
import { joinDiveEvent } from '../controller/eventParticipantController';

const router = express.Router();

router.get('/', joinDiveEvent);

export default router;