import {api}  from "./api";

// ✅ admin - list users
export const adminGetAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// ✅ admin - toggle role (admin/user)
export const adminToggleUserRole = async (id) => {
  const res = await api.put(`/admin/users/${id}/toggle-role`);
  return res.data;
};
