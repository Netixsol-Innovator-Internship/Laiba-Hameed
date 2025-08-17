import api from "./api";

export const addToCart = async (data) => {
  try {
    console.log(data)
    const res = await api.post("/cart",data);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};