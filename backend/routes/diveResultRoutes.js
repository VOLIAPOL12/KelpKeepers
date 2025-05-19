import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getDiveResultData } from '../controller/diveResultController.js';

const router = express.Router();

router.get('/',userAuth, getDiveResultData);

export default router;