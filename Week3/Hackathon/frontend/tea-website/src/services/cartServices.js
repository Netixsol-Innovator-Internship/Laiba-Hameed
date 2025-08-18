import api from "./api";

export const addToCart = async (data) => {
  try {
    console.log(data);
    const res = await api.post("/cart", data);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};

export const getCartProducts = async () => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error) {
    return error?.response;
  }
};


export const increaseQuantity = async (id) => {
  try {
    console.log(id)
    const res = await api.patch(`/cart/increase/${id}`,);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};


export const decreaseQuantity = async (id) => {
  try {
    console.log(id)
    const res = await api.patch(`/cart/decrease/${id}`,);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};


export const removeItemFromCart = async (id) => {
  try {
    console.log(id)
    const res = await api.delete(`/cart/${id}`,);
    return res.data;
  } catch (error) {
    return error?.response;
  }
};