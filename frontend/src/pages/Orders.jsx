import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMyOrders } from "../services/orderservice";
import { formatPrice } from "../utils/formatPrice";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await getMyOrders();
      setOrders(res || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold">My Orders</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track and view all your purchases
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600 mt-6">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="mt-10 text-gray-600">
          <p>No orders found.</p>
          <p className="text-sm mt-2">
            Add items to cart and checkout to create orders✅
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl bg-white p-5"
            >
              {/* top row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{order._id}</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === "paid" 
                      ? "bg-green-100 text-green-800" 
                      : order.paymentStatus === "failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    Payment: {order.paymentStatus || "pending"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs border">
                    Status: {order.orderStatus || "placed"}
                  </span>
                </div>
              </div>

              {/* items */}
              <div className="mt-5 space-y-3">
                {order.items?.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border rounded-xl p-3"
                  >
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{it.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {it.qty} {it.size ? `• Size: ${it.size}` : ""}
                      </p>
                    </div>

                    <p className="font-semibold text-sm">
                      {formatPrice(it.price * it.qty)}
                    </p>
                  </div>
                ))}
              </div>

              {/* total */}
              <div className="mt-5 flex justify-between items-center border-t pt-4">
                <p className="text-sm text-gray-600">
                  Ordered on{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "--"}
                </p>

                <p className="text-lg font-bold">
                  Total: {formatPrice(order.totalAmount || 0)}
                </p>
              </div>

              {/* shipping */}
              {order.shippingAddress && (
                <div className="mt-4 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">Shipping Address</p>
                  <p>
                    {order.shippingAddress.fullName},{" "}
                    {order.shippingAddress.phone}
                  </p>
                  <p>
                    {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
