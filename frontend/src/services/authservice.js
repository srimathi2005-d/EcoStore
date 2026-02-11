import  {api}  from "./api";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// ✅ get logged user info
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

// ✅ update profile
export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};
