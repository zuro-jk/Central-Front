import axios from "axios";

// Base URL del backend
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
