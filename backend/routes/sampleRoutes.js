import express from "express";
import { sampleController } from "../controller/sampleController.js";

const router = express.Router();

router.get("/sample-test", sampleController);

export default router;