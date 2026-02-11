import {api} from "./api";

export const uploadImage = async (file) => {
  const form = new FormData();
  form.append("image", file);

  const res = await api.post("/upload", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return res.data;
};
