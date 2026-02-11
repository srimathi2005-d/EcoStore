import Product from "../models/Product.js";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/* ---------------- CREATE PRODUCT ---------------- */
export const createProduct = async (req, res) => {
  try {
    const data = req.body;

    const salePrice = data.salePrice ? Number(data.salePrice) : null;
    const price = Number(data.price);

    const product = await Product.create({
      ...data,
      price,
      slug: slugify(data.title),
      salePrice: salePrice,
      isOnSale: salePrice && salePrice < price
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Product create failed" });
  }
};

/* ---------------- GET PRODUCTS ---------------- */
export const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      size = "",
      minPrice = 0,
      maxPrice = 999999,
      sort = "new",
      page = 1,
      limit = 12,
      sale = false
    } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) }
    };

    if (category) query.category = category;
    if (size) query.sizes = size;

    // ✅ STRICT SALE FILTER (ONLY SALE PRODUCTS)
    const isSale = sale === true || sale === "true";
    if (isSale) {
      query.isOnSale = true;
    }


    const sortMap = {
      new: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      title_asc: { title: 1 }
    };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Product.find(query)
        .sort(sortMap[sort] || sortMap.new)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(query)
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Products fetch failed" });
  }
};

/* ---------------- GET PRODUCT BY SLUG ---------------- */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Product fetch failed" });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
export const updateProduct = async (req, res) => {
  try {
    const body = req.body;

    // ✅ if title updates, update slug too
    if (body.title) {
      body.slug = slugify(body.title);
    }

    // ✅ sale logic
    const salePrice =
      body.salePrice !== undefined && body.salePrice !== ""
        ? Number(body.salePrice)
        : null;

    if (salePrice && salePrice > 0) {
      body.salePrice = salePrice;
      body.isOnSale = true;
    } else {
      body.salePrice = null;
      body.isOnSale = false;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true
    });

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ---------------- DELETE PRODUCT ---------------- */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
