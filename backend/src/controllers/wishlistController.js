import Wishlist from "../models/Wishlist.js";

export const getMyWishlist = async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id })
    .populate("product");

  res.json(items);
};

export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  const existing = await Wishlist.findOne({
    user: req.user._id,
    product: productId
  });

  if (existing) {
    await Wishlist.deleteOne({ _id: existing._id });
    return res.json({ message: "Removed from wishlist" });
  }

  const created = await Wishlist.create({
    user: req.user._id,
    product: productId
  });

  res.json({ message: "Added to wishlist", created });
};
