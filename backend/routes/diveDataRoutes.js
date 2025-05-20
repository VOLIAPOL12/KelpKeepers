import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { uploadDiveData } from '../controller/diveDataController.js';

const router = express.Router();

router.post('/', userAuth, uploadDiveData);

export default router;