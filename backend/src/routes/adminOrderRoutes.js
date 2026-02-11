import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  adminGetOrders,
  adminUpdateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGetOrders);
router.put("/:id/status", protect, adminOnly, adminUpdateOrderStatus);

export default router;
