import apiClient from "./apiClient";

export const getCartAPI = async () => {
  const response = await apiClient.get("/cart");
  return response.data;
};

export const addToCartAPI = async (productId, quantity) => {
  const response = await apiClient.post("/cart/add", { productId, quantity });
  return response.data;
};

export const updateCartItemAPI = async (itemId, quantity) => {
  const response = await apiClient.put(`/cart/${itemId}`, { quantity });
  return response.data;
};

export const removeFromCartAPI = async (itemId) => {
  const response = await apiClient.delete(`/cart/${itemId}`);
  return response.data;
};
