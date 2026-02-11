import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/razorpay-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyRazorpayPayment);

export default router;
