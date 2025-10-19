import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080", // ajusta si usas otro host/puerto
  timeout: 15000,
});

// lee token desde localStorage o sessionStorage (por si NO marcas "Recuérdame")
const getToken = () =>
  localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

// Adjunta el token automáticamente si existe
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default http;
