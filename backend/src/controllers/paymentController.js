import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

let razorpay = null;

// ✅ Do not crash backend if keys missing
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} else {
  console.log("⚠️ Razorpay keys missing in .env. Payment routes disabled until added.");
}

export const createRazorpayOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ message: "Razorpay keys missing in .env" });
    }

    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "eco_" + Date.now()
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Razorpay order create failed" });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = "paid";
    order.razorpay = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature
    };

    await order.save();

    res.json({ success: true, message: "Payment verified ✅" });
  } catch (error) {
    res.status(500).json({ message: "Payment verify failed" });
  }
};
