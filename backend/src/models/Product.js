import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },

    description: { type: String, default: "" },
    category: { type: String, required: true },

    tags: [{ type: String }],

    images: [
      {
        url: String,
        public_id: String
      }
    ],

    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },

    sizes: [{ type: String }], // S M L XL
    stock: { type: Number, default: 0 },

    isFeatured: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
