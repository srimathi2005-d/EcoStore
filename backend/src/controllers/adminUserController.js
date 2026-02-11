import User from "../models/User.js";

export const adminGetUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ items: users });
  } catch (err) {
    console.log("adminGetUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const adminToggleUserRole = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return res.status(400).json({ message: "You cannot change your own role" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.json({ message: "Role updated ✅", user });
  } catch (err) {
    console.log("adminToggleUserRole error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
