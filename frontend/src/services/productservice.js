import {api} from "./api";

// ✅ Public/Shop/Sale product list
export const getProducts = async (params = {}) => {
  const res = await api.get("/products", { params });
  return res.data;
};

// ✅ Product details
export const getProductBySlug = async (slug) => {
  console.log("Slug received in service:", slug);
  const res = await api.get(`/products/${slug}`);
  return res.data;
};


// ✅ ADMIN: stats for dashboard
export const adminGetStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

// ✅ ADMIN: get products list for admin dashboard
export const adminGetProducts = async ({ page = 1, limit = 5 } = {}) => {
  const res = await api.get(`/admin/products?page=${page}&limit=${limit}`);
  return res.data;
};


// ✅ ADMIN: create product
export const adminCreateProduct = async (data) => {
  const res = await api.post("/admin/products", data);
  return res.data;
};

// ✅ ADMIN: update product
export const adminUpdateProduct = async (id, data) => {
  const res = await api.put(`/admin/products/${id}`, data);
  return res.data;
};

// ✅ ADMIN: delete product
export const adminDeleteProduct = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};
export const adminGetAllProducts = async () => {
  const res = await api.get("/admin/products");
  return res.data;
};
