import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import {
  adminGetAllOrders,
  adminUpdateOrderStatus,
  adminUpdatePaymentStatus
} from "../../services/orderservice";
import { formatPrice } from "../../utils/formatPrice";

const STATUSES = ["placed", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid", "failed"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [updatingPaymentId, setUpdatingPaymentId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await adminGetAllOrders();
      setOrders(res.items || res || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      await adminUpdateOrderStatus(orderId, status);
      toast.success("Order status updated ✅");
      load();
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  const changePaymentStatus = async (orderId, paymentStatus) => {
    try {
      setUpdatingPaymentId(orderId);
      await adminUpdatePaymentStatus(orderId, paymentStatus);
      toast.success("Payment status updated ✅");
      load();
    } catch (err) {
      console.log(err);
      toast.error("Payment update failed");
    } finally {
      setUpdatingPaymentId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <AdminSidebar />
        </div>

        <div className="md:col-span-3 space-y-6">
          <AdminTopbar title="Orders" subtitle="Manage store orders" />

          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-600">No orders found</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-2xl bg-white p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>
                      <p className="font-semibold">{order._id}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "paid" 
                          ? "bg-green-100 text-green-800" 
                          : order.paymentStatus === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        Payment: {order.paymentStatus || "pending"}
                      </span>

                      <span className="px-3 py-1 rounded-full border text-xs">
                        Method: {order.paymentMethod || "COD"}
                      </span>

                      <span className="px-3 py-1 rounded-full border text-xs font-semibold">
                        Total: {formatPrice(order.totalAmount || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-4 space-y-2">
                    {order.items?.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 border rounded-xl p-3"
                      >
                        <img
                          src={it.image}
                          alt={it.title}
                          className="w-14 h-14 rounded-xl border object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.title}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {it.qty} {it.size ? `• Size: ${it.size}` : ""}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          {formatPrice((it.price || 0) * (it.qty || 1))}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Status Update */}
                  <div className="mt-5 space-y-4 border-t pt-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold">
                          Order Status:{" "}
                          <span className="capitalize">{order.orderStatus}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.orderStatus}
                          disabled={updatingId === order._id}
                          onChange={(e) => changeStatus(order._id, e.target.value)}
                          className="px-4 py-2 border rounded-xl text-sm"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        {updatingId === order._id && (
                          <span className="text-xs text-gray-500">
                            Updating...
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Payment Status Update (only for COD) */}
                    {order.paymentMethod === "COD" && (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold">
                            Payment Status:{" "}
                            <span className={`capitalize ${
                              order.paymentStatus === "paid" 
                                ? "text-green-600" 
                                : order.paymentStatus === "failed"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}>
                              {order.paymentStatus || "pending"}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={order.paymentStatus || "pending"}
                            disabled={updatingPaymentId === order._id}
                            onChange={(e) => changePaymentStatus(order._id, e.target.value)}
                            className="px-4 py-2 border rounded-xl text-sm"
                          >
                            {PAYMENT_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>

                          {updatingPaymentId === order._id && (
                            <span className="text-xs text-gray-500">
                              Updating...
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shipping */}
                  {order.shippingAddress && (
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="font-medium text-gray-900">
                        Shipping Address
                      </p>
                      <p>
                        {order.shippingAddress.fullName},{" "}
                        {order.shippingAddress.phone}
                      </p>
                      <p className="text-xs mt-1">
                        {order.shippingAddress.addressLine1},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
