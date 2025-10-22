import { api } from "../api/api";
import type { ApiResponse } from "../types/api-response";
import type { UserResponse } from "../types/user.model";

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  sessionId: string;
  user: UserResponse;
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post<ApiResponse<LoginResponse>>("auth/login", data);

    if (!res.data.success) {
      throw new Error(res.data.message || "Error en la autenticación");
    }

    return res.data.data;
  },
};
