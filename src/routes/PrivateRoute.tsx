import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/core/stores/authStore";

const PrivateRoute = () => {
  // const { isLoggedIn } = useAuthStore();
  const token = localStorage.getItem("access_token") || import.meta.env.VITE_DEV_BEARER;
  const isLoggedIn = Boolean(token);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      replace
    />
  );
}

export default PrivateRoute