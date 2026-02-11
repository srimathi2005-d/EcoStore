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
    await order.save();

    res.json(order);
  } catch (err) {
    console.log("adminUpdateOrderStatus error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
