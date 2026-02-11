import express from "express";
import upload from "../middleware/multer.js";
import { uploadImage } from "../controllers/uploadController.js";
import { protect, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, upload.single("image"), uploadImage);

export default router;
