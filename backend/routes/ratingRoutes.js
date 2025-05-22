import express from 'express';

import userAuth from '../middleware/userAuth.js';
import { submitRating, getRatingsByEvent, getAverageRating } from '../controller/ratingController.js';

const router = express.Router();

router.post('/', userAuth, submitRating);
router.get('/:event_id', userAuth, getRatingsByEvent);
router.get('/average/:event_id', getAverageRating);

export default router;
