import { CATEGORIES, SIZES, SORT_OPTIONS } from "../../utils/constants";

export default function ProductFilters({
  filters,
  setFilters,
  onApply,
  onClear
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white sticky top-6">
      <h3 className="font-semibold text-lg">Filter</h3>

      {/* Search */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Search</label>
        <input
          value={filters.search}
          onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
          placeholder="Search products..."
          className="w-full mt-1 px-3 py-2 border rounded-xl outline-none"
        />
      </div>

      {/* Category */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Category</label>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((p) => ({ ...p, category: e.target.value }))
          }
          className="w-full mt-1 px-3 py-2 border rounded-xl"
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Size</label>
        <select
          value={filters.size}
          onChange={(e) => setFilters((p) => ({ ...p, size: e.target.value }))}
          className="w-full mt-1 px-3 py-2 border rounded-xl"
        >
          <option value="">All</option>
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Max Price</label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((p) => ({ ...p, maxPrice: e.target.value }))
          }
          className="w-full mt-1 px-3 py-2 border rounded-xl"
        />
      </div>

      {/* Sort */}
      <div className="mt-4">
        <label className="text-sm text-gray-600">Sort</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
          className="w-full mt-1 px-3 py-2 border rounded-xl"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={onApply}
          className="flex-1 bg-black text-white py-2 rounded-xl hover:opacity-90"
        >
          Apply
        </button>
        <button
          onClick={onClear}
          className="flex-1 border py-2 rounded-xl"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
