import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../services/productservice";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { slug } = useParams();

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    if (!slug) return; // ✅ prevent /products/undefined

    try {
      setLoading(true);
      setError("");

      console.log("Fetching product with slug:", slug);

      const data = await getProductBySlug(slug);

      setProduct(data);
      setActiveImg(data?.images?.[0]?.url || "");
    } catch (err) {
      console.error("Product fetch failed:", err.response?.status);
      setError("Product not found");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  if (loading) return <div className="p-8">Loading product...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  const showStrike =
    product.salePrice && product.salePrice < product.price;

  const wished = product?._id
    ? isWishlisted(product._id)
    : false;

  const handleWishlist = () => {
    if (!product?._id) return;
    wished
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <div className="border rounded-3xl overflow-hidden bg-white">
            <img
              src={activeImg}
              alt={product.title}
              className="w-full h-[520px] object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4 overflow-auto">
            {product.images?.map((img) => (
              <button
                key={img.public_id || img.url}
                onClick={() => setActiveImg(img.url)}
                className={`border rounded-2xl overflow-hidden w-20 h-20 ${
                  activeImg === img.url
                    ? "border-black"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img.url}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {product.category}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xl font-bold">
              {formatPrice(product.salePrice || product.price)}
            </span>

            {showStrike && (
              <span className="text-gray-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="text-gray-700 mt-5 leading-relaxed">
            {product.description ||
              "Eco-friendly premium wear for daily comfort."}
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium">Select Size</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2 rounded-xl border ${
                      selectedSize === s
                        ? "bg-black text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="flex-1 px-6 py-3 rounded-2xl bg-black text-white"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className={`px-6 py-3 rounded-2xl border ${
                wished
                  ? "bg-yellow-50 border-yellow-400"
                  : "hover:bg-gray-50"
              }`}
            >
              {wished ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="mt-8 border-t pt-5 text-sm text-gray-600">
            <p>100% User friendly materials</p>
            <p className="mt-1">🚚 Delivery in 3–7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
