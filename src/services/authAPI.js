import apiClient from "./apiClient";

export const loginAPI = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const registerAPI = async (userData) => {
  const response = await apiClient.post("/auth/register", userData);
  return response.data;
};

export const createAdminAPI = async (userData) => {
  const response = await apiClient.post("/auth/register-admin", userData);
  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};
