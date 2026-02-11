import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { adminDeleteProduct, adminGetAllProducts } from "../../services/productservice";
import { formatPrice } from "../../utils/formatPrice";

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const res = await adminGetAllProducts();
      setItems(res.items || res || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminDeleteProduct(id);
      toast.success("Product deleted ✅");
      load();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        <div className="md:col-span-3 space-y-6">
          <AdminTopbar title="Products" subtitle="Manage all products" />

          <div className="flex justify-end">
            <Link
              to="/admin/products/add"
              className="px-5 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90"
            >
              + Add Product
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-600">No products found</p>
          ) : (
            <div className="space-y-3">
              {items.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-2xl bg-white p-4 flex gap-4 items-center"
                >
                  <img
                    src={p.images?.[0]?.url}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-xl border"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm text-gray-500">{p.category}</p>
                  </div>

                  <div className="text-sm font-semibold">
                    {formatPrice(p.salePrice || p.price)}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-4 py-2 rounded-xl border text-sm text-red-600 hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
