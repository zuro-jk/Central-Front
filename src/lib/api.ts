import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export function formatPriceNumber(n: number) {
  return `S/ ${n.toFixed(2)}`;
}

// Interceptor temporal: adjunta Authorization si existe token en localStorage o VITE_DEV_BEARER
api.interceptors.request.use((config) => {
  const existing = (config.headers as any)?.["Authorization"] || (config.headers as any)?.["authorization"];
  if (!existing) {
    const token = localStorage.getItem("access_token") || import.meta.env.VITE_DEV_BEARER;
    if (token) {
      const value = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      if ((config.headers as any)?.set) {
        // Axios v1 AxiosHeaders
        (config.headers as any).set("Authorization", value);
      } else {
        // Plain object headers
        (config as any).headers = { ...(config.headers || {}), Authorization: value };
      }
    }
  }
  return config;
});
