import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (password && password.length >= 6) user.password = password;

    await user.save();

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
};

export const addWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }

  res.json({ message: "Added to wishlist ✅" });
};

export const removeWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  await user.save();

  res.json({ message: "Removed from wishlist ✅" });
};
