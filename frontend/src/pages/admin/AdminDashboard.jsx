import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

import { adminGetStats, adminGetProducts } from "../../services/productservice";
import { adminGetOrders } from "../../services/orderservice";

const statusColor = (status) => {
  if (!status) return "bg-gray-50 text-gray-700 border-gray-200";
  const s = status.toLowerCase();
  if (s === "delivered") return "bg-green-50 text-green-700 border-green-200";
  if (s === "placed") return "bg-yellow-50 text-yellow-700 border-yellow-200";
  if (s === "cancelled") return "bg-red-50 text-red-700 border-red-200";
  return "bg-gray-50 text-gray-700 border-gray-200";
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [latestOrders, setLatestOrders] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const load = async () => {
    try {
      const s = await adminGetStats();
      setStats(s);

      const o = await adminGetOrders({ limit: 5 });
      setLatestOrders(o?.items || []);

      const p = await adminGetProducts({ limit: 5 });
      setLatestProducts(p?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const Card = ({ title, value }) => (
    <div className="border rounded-3xl p-5 bg-white hover:shadow-sm transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
  <div className="px-4 md:px-6 pt-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview and quick actions to manage store.
        </p>
      </div>

      <div className="flex gap-2 mt-2 md:mt-4">
        <Link
          to="/admin/products/add"
          className="px-4 py-2 rounded-xl bg-black text-white text-sm hover:opacity-90"
        >
          + Add Product
        </Link>
        <Link
          to="/admin/orders"
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50 bg-white"
        >
          Manage Orders
        </Link>
      </div>
    </div>

    {/* Stats */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Products" value={stats.products} />
      <Card title="Orders" value={stats.orders} />
      <Card title="Users" value={stats.users} />
    </div>

    {/* Orders + Products */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Orders */}
      <div className="border rounded-3xl p-6 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm underline">
            View all
          </Link>
        </div>

        {latestOrders.length === 0 ? (
          <div className="mt-6 border rounded-2xl p-5 text-sm text-gray-600 bg-gray-50">
            No orders yet.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {latestOrders.map((o) => (
              <div
                key={o._id}
                className="flex items-center justify-between border rounded-2xl p-4 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="text-sm font-semibold">
                    Order #{o._id.slice(-6)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {formatPrice(o.totalAmount)}
                  </p>
                  <span
                    className={`inline-flex text-xs px-2 py-1 rounded-full border capitalize mt-1 ${statusColor(
                      o.orderStatus
                    )}`}
                  >
                    {o.orderStatus}
                  </span>
                </div>
              </div>
            ))}

            {latestOrders.length < 5 && (
              <div className="border rounded-2xl p-4 text-sm text-gray-500 bg-gray-50">
                You’re all caught up ✅
              </div>
            )}
          </div>
        )}
      </div>

      {/* Latest Products */}
      <div className="border rounded-3xl p-6 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest Products</h2>
          <Link to="/admin/products" className="text-sm underline">
            View all
          </Link>
        </div>

        {latestProducts.length === 0 ? (
          <div className="mt-6 border rounded-2xl p-5 text-sm text-gray-600 bg-gray-50">
            No products yet.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {latestProducts.map((p) => (
              <div
                key={p._id}
                className="flex items-center gap-4 border rounded-2xl p-4 hover:bg-gray-50 transition"
              >
                <img
                  src={p.images?.[0]?.url || "/images/banner.jpg"}
                  alt={p.title}
                  className="w-14 h-14 rounded-xl object-cover border bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-1">
                    {p.title}
                  </p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Quick Tips */}
    <div className="mt-8 border rounded-3xl p-6 bg-gray-50">
      <h2 className="text-lg font-semibold">Quick Tips</h2>
      <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
        <li>Use Sale Price for discount products (Sale page auto updates)</li>
        <li>Upload clear product images (better conversions)</li>
        <li>Update order status after shipping</li>
      </ul>
    </div>
  </div>
);
}
