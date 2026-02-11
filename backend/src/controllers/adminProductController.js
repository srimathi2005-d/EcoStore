import Product from "../models/Product.js";

// ✅ GET all products (admin)
export const adminGetProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ items: products });
  } catch (err) {
    console.log("adminGetProducts error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CREATE product (admin)
export const adminCreateProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      category,
      price,
      salePrice,
      sizes,
      stock,
      isSale,
      images
    } = req.body;

    if (!title || !slug || !category || price === undefined) {
      return res.status(400).json({
        message: "title, slug, category, price are required"
      });
    }

    const exists = await Product.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: "Slug already exists" });
    }

    const product = await Product.create({
      title,
      slug,
      description,
      category,
      price,
      salePrice: salePrice || null,
      sizes: sizes || [],
      stock: stock || 0,
      isSale: isSale ?? false,
      images: images || []
    });

    res.status(201).json(product);
  } catch (err) {
    console.log("adminCreateProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE product (admin)
export const adminUpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log("adminUpdateProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE product (admin)
export const adminDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted ✅" });
  } catch (err) {
    console.log("adminDeleteProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
