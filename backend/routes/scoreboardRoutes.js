import express from "express";
import { getLeaderboard } from "../controller/scoreboardController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.get("/", userAuth, getLeaderboard);

export default router;