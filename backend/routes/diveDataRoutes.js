import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { uploadDiveData, updateDiveData } from '../controller/diveDataController.js';

const router = express.Router();

router.post('/', userAuth, uploadDiveData);
router.put('/', userAuth, updateDiveData);

export default router;