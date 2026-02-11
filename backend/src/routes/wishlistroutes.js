import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { getMyWishlist, toggleWishlist } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/my", protect, getMyWishlist);
router.post("/toggle", protect, toggleWishlist);

export default router;
