import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log("📌 Connected DB Name:", mongoose.connection.name);

  } catch (error) {
    console.log("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
