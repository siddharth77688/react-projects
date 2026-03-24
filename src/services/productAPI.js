import apiClient from "./apiClient";

export const fetchProductsAPI = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const fetchProductByIdAPI = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

// Admin functions
export const createProductAPI = async (productData) => {
  const response = await apiClient.post("/products", productData);
  return response.data;
};

export const updateProductAPI = async (id, productData) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProductAPI = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};
