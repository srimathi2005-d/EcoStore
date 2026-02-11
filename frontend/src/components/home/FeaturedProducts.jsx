import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { getProducts } from "../../services/productservice";

export default function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeatured = async () => {
    try {
      setLoading(true);

      // NOTE: backend doesn't have featured filter yet,
      // so we load latest products as "Featured".
      const res = await getProducts({ limit: 8, sort: "new" });
      setItems(res.items || []);
    } catch (e) {
      console.log("featured fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeatured();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Featured</h2>
          <p className="text-sm text-gray-600 mt-1">
            Latest eco-friendly pieces from our store.
          </p>
        </div>

        <Link to="/shop" className="text-sm text-gray-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-gray-600">Loading featured products...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No products available</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
