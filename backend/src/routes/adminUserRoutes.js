import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  adminGetUsers,
  adminToggleUserRole,
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get("/", protect, adminOnly, adminGetUsers);
router.put("/:id/toggle-role", protect, adminOnly, adminToggleUserRole);

export default router;
