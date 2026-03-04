import apiClient from "./apiClient";

export const fetchProductsAPI = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};
