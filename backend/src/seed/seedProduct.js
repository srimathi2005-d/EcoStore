import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import fs from "fs";

dotenv.config({ path: "./.env" });
await connectDB();

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const data = JSON.parse(
  fs.readFileSync("./src/seed/sampleProducts.json", "utf-8")
);

const seed = async () => {
  try {
    const cleaned = data.map((p) => {
      const price = Number(p.price || 0);
      const salePrice =
        p.salePrice !== undefined && p.salePrice !== null && p.salePrice !== ""
          ? Number(p.salePrice)
          : null;

      return {
        ...p,
        price,
        salePrice,
        slug: p.slug || slugify(p.title),
        isOnSale: salePrice !== null && salePrice < price
      };
    });

    await Product.deleteMany();
    await Product.insertMany(cleaned);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (err) {
    console.log("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
