import { useAuthStore } from "@/core/stores/auth/auth.store";
import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
      toast.warn("Sesión expirada o no autorizada.");
    }
    return Promise.reject(error);
  }
);
