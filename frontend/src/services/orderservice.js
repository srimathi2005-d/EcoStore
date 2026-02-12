import {api} from "./api";

// ✅ get logged-in user's orders
export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};

// ✅ get single order detail
export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

// ✅ create order
export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// ✅ admin - get all orders
export const adminGetAllOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

// ✅ admin - update order status
export const adminUpdateOrderStatus = async (id, orderStatus) => {
  const res = await api.put(`/admin/orders/${id}/status`, { orderStatus });
  return res.data;
};

// ✅ admin - update payment status (for COD orders)
export const adminUpdatePaymentStatus = async (id, paymentStatus) => {
  const res = await api.put(`/admin/orders/${id}/payment-status`, { paymentStatus });
  return res.data;
};

// ✅ admin - get orders (pagination)
export const adminGetOrders = async ({ page = 1, limit = 5 } = {}) => {
  const res = await api.get(`/admin/orders?page=${page}&limit=${limit}`);
  return res.data;
};
