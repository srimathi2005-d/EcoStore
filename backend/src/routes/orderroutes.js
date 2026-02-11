import express from "express";
import { protect, isAdmin } from "../middleware/authmiddleware.js";
import {
  createOrder,
  getAllOrders,
  myOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, myOrders);

router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;
