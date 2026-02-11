import { Link } from "react-router-dom";
import { CATEGORIES } from "../../utils/constants";

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link to="/shop" className="text-sm text-gray-600 hover:underline">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {CATEGORIES.slice(0, 8).map((cat) => (
          <Link
            key={cat}
            to={`/shop?category=${encodeURIComponent(cat)}`}
            className="border rounded-2xl p-5 bg-white hover:shadow-sm transition"
          >
            <p className="text-sm text-gray-500">Collection</p>
            <p className="mt-1 font-semibold text-gray-900">{cat}</p>
            <p className="mt-2 text-xs text-gray-600">
              Explore {cat.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
