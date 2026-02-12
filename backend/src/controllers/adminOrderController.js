import Order from "../models/Order.js";

export const adminGetOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json({ items: orders });
  } catch (err) {
    console.log("adminGetOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminUpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowed = ["placed", "processing", "shipped", "delivered", "cancelled"];
    if (!allowed.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = orderStatus;

    // For COD orders, mark payment as paid only when delivered
    if (orderStatus === "delivered" && order.paymentMethod === "COD" && order.paymentStatus === "pending") {
      order.paymentStatus = "paid";
      order.paidAt = new Date();
    }

    await order.save();

    res.json(order);
  } catch (err) {
    console.log("adminUpdateOrderStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminUpdatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    console.log("Payment update - ID:", id, "Status:", paymentStatus, "Body:", req.body);

    const allowed = ["pending", "paid", "failed"];
    if (!allowed.includes(paymentStatus)) {
      return res.status(400).json({ message: `Invalid payment status: ${paymentStatus}. Allowed: ${allowed.join(", ")}` });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = paymentStatus;
    
    // When marking payment as paid, record the payment time
    if (paymentStatus === "paid" && !order.paidAt) {
      order.paidAt = new Date();
    }
    
    await order.save();

    res.json(order);
  } catch (err) {
    console.log("adminUpdatePaymentStatus error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
