import {api}  from "./api";

export const adminGetStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

