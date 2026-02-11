import { useEffect, useState } from "react";
import ProductFilters from "../components/products/ProductFilters";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/products/Pagination";
import { getProducts } from "../services/productservice";

export default function Sale() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    size: "",
    maxPrice: 5000,
    sort: "new",
    page: 1,
    limit: 12
  });

  const fetchSaleProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        sale: true,
        search: filters.search,
        category: filters.category,
        size: filters.size,
        maxPrice: filters.maxPrice,
        sort: filters.sort,
        page: filters.page,
        limit: filters.limit
      });

      setProducts(res.items);
      setMeta({ page: res.page, pages: res.pages, total: res.total });
    } catch (error) {
      console.log("Sale fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaleProducts();
    // eslint-disable-next-line
  }, [filters.page]);

  const onApply = () => {
    setFilters((p) => ({ ...p, page: 1 }));
    setTimeout(fetchSaleProducts, 50);
  };

  const onClear = () => {
    setFilters({
      search: "",
      category: "",
      size: "",
      maxPrice: 5000,
      sort: "new",
      page: 1,
      limit: 12
    });
    setTimeout(fetchSaleProducts, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold tracking-wide">SALE</h1>
        <p className="text-sm text-gray-600">{meta.total} Products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Filters */}
        <div className="md:col-span-1">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            onApply={onApply}
            onClear={onClear}
          />
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          {loading ? (
            <p className="text-gray-600">Loading sale products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            page={meta.page}
            pages={meta.pages}
            onPageChange={(newPage) =>
              setFilters((p) => ({ ...p, page: newPage }))
            }
          />
        </div>
      </div>
    </div>
  );
}
