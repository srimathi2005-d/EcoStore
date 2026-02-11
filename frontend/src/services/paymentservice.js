import {api}  from "./api";

export const createRazorpayOrder = async (amount) => {
  const res = await api.post("/payments/razorpay-order", { amount });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await api.post("/payments/verify", data);
  return res.data;
};
