import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { updateProfile, getWishlist, addWishlist, removeWishlist } from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist", protect, addWishlist);
router.delete("/wishlist/:productId", protect, removeWishlist);

export default router;
