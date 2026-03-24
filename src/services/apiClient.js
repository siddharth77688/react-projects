import axios from "axios";
import { store } from "../app/store";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
