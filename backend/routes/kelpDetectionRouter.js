import express from 'express';
import multer from 'multer';

import { analyzeKelpImage } from '../controller/kelpDetectionController.js';
const upload = multer({ dest: 'uploads/' });

const kelpDetectionRouter = express.Router();

kelpDetectionRouter.post('/identification', upload.single('image'), analyzeKelpImage);

export default kelpDetectionRouter;