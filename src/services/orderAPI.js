import apiClient from "./apiClient";

export const createOrderAPI = async (orderData) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};

export const getOrdersAPI = async () => {
  const response = await apiClient.get("/orders");
  return response.data;
};

export const getOrderByIdAPI = async (orderId) => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data;
};
