import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { adminGetStats } from "../controllers/adminStatsController.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGetStats);

export default router;
