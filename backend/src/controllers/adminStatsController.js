import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const adminGetStats = async (req, res) => {
  try {
    const [products, orders, users] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
    ]);

    res.json({ products, orders, users });
  } catch (err) {
    console.log("adminGetStats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
