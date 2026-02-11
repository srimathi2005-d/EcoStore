import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config({ path: "./.env" });

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const run = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    const products = await Product.find();
    console.log(`📦 Found ${products.length} products`);

    for (const p of products) {
      const newSlug = slugify(p.title);

      const price = Number(p.price || 0);
      const salePrice =
        p.salePrice !== undefined && p.salePrice !== null && p.salePrice !== ""
          ? Number(p.salePrice)
          : null;

      const isOnSale = salePrice && salePrice > 0 && salePrice < price;

      await Product.findByIdAndUpdate(
        p._id,
        {
          slug: newSlug,
          salePrice: isOnSale ? salePrice : null,
          isOnSale: isOnSale
        },
        { new: true }
      );

      console.log(`✅ Updated: ${p.title} -> ${newSlug}`);
    }

    console.log("🎉 ALL slugs + sale flags fixed successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Fix slugs failed:", err.message);
    process.exit(1);
  }
};

run();
