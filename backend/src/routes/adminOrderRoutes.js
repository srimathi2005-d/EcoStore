import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  adminGetOrders,
  adminUpdateOrderStatus,
  adminUpdatePaymentStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGetOrders);
router.put("/:id/status", protect, adminOnly, adminUpdateOrderStatus);
router.put("/:id/payment-status", protect, adminOnly, adminUpdatePaymentStatus);

export default router;
