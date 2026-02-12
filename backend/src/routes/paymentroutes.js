import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { createRazorpayOrder, verifyRazorpayPayment } from "../controllers/paymentController.js";

const router = express.Router();

// 👉 Create order
router.post("/create-order", createRazorpayOrder);

// 👉 Verify payment
router.post("/verify", protect, verifyRazorpayPayment);

export default router;
