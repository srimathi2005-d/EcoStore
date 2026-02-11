import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";

export default function ProductGrid({
  title = "Products",
  products = [],
  loading = false,
  total = 0,
  sort,
  onSortChange
}) {
  return (
    <div>
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{total} items</p>
        </div>

        {sort && onSortChange && (
          <SortDropdown value={sort} onChange={onSortChange} />
        )}
      </div>

      {/* Content */}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
