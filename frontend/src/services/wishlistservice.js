import {api} from "./api";

export const getWishlist = async () => {
  const res = await api.get("/users/wishlist");
  return res.data;
};

export const addWishlist = async (productId) => {
  const res = await api.post("/users/wishlist", { productId });
  return res.data;
};

export const removeWishlist = async (productId) => {
  const res = await api.delete(`/users/wishlist/${productId}`);
  return res.data;
};
