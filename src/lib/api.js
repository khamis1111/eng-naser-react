import axios from "axios";
import Cookie from "js-cookie";

export const BaseUrlApi = `http://127.0.0.1:8000/api`;

// Add axios interceptor to include token in requests
axios.interceptors.request.use((config) => {
  const token = Cookie.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ErrorMessage = (error) =>
  error.response?.data?.errors ||
  error.response?.data?.message ||
  error.response?.data?.error ||
  "Something went wrong. Please try again.";
