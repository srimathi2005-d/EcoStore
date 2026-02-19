import dotenv from "dotenv";

// ✅ Load env FIRST before any imports that use env variables
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";

import authroutes from "./routes/authroutes.js";
import productroutes from "./routes/productroutes.js";
import uploadroutes from "./routes/uploadroutes.js";
import orderroutes from "./routes/orderroutes.js";
import paymentroutes from "./routes/paymentroutes.js";
import userroutes from "./routes/userroutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminStatsRoutes from "./routes/adminStatsRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import wishlistroutes from "./routes/wishlistroutes.js";
console.log("ENV Loaded:", process.env.RAZORPAY_KEY_ID);

// ✅ Connect DB
connectDB();

// ✅ Create app FIRST
const app = express();

// ✅ CORS AFTER app created
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// ✅ Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Routes
app.get("/", (req, res) => res.send("✅ Eco-Store API Running"));

app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
app.use("/api/upload", uploadroutes);
app.use("/api/orders", orderroutes);
app.use("/api/payments", paymentroutes);
app.use("/api/users", userroutes);

// ✅ Admin Route
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/wishlist", wishlistroutes);




// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
