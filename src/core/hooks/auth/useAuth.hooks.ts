import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { roleDefaultRoutes } from "../../constants/role-routes";
import {
  authService,
  type LoginResponse,
} from "../../services/auth/auth.service";
import { useAuthStore } from "../../stores/auth/auth.store";
import type { ApiError, ApiResponse } from "../../types/base/api-response";
import type { LoginRequest, SignupRequest } from "@/core/types/auth/auth.model";
import { toast } from "react-toastify";

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
      toast.error(message);
    },
  });
}

export function useSignupMutation() {
  const navigate = useNavigate();

  return useMutation<ApiResponse<number>, AxiosError<ApiError>, SignupRequest>({
    mutationFn: (data) => authService.signup(data),
    onSuccess: (data) => {
      toast.success(data.message || "Cuenta creada. Revisa tu correo.");

      navigate("/auth/login");
    },
    onError: (error) => {
      console.error(error);
      const message =
        error.response?.data?.message ||
        (error.response?.data?.errors
          ? error.response.data.errors[0].defaultMessage
          : "Error al registrarse");

      toast.error(message);
    },
  });
}
