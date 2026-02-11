import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  adminGetProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct
} from "../controllers/adminProductController.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGetProducts);
router.post("/", protect, adminOnly, adminCreateProduct);
router.put("/:id", protect, adminOnly, adminUpdateProduct);
router.delete("/:id", protect, adminOnly, adminDeleteProduct);

export default router;
