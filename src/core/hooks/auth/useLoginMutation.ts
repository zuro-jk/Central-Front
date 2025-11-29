import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { roleDefaultRoutes } from "../../constants/role-routes";
import {
  authService,
  type LoginResponse,
} from "../../services/auth/auth.service";
import { useAuthStore } from "../../stores/auth/auth.store";
import type { ApiError } from "../../types/base/api-response";
import type { LoginRequest } from "../../types/user/user.model";

export function useLoginMutation() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: (data) => authService.login(data),
    onSuccess: (data) => {
      setAuth(data);

      const userRole = data.user.roles?.[0];
      const redirectPath = roleDefaultRoutes[userRole] || "/";

      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      console.error(error);
      const message = error.response?.data?.message || "Error de autenticación";
      alert(message);
    },
  });
}
