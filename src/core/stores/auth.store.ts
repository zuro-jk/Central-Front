import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse } from "../services/auth.service";
import type { UserResponse } from "../types/user.model";

interface AuthState {
  user: UserResponse | null;
  accessToken: string | null;
  sessionId: string | null;
  setAuth: (data: LoginResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      sessionId: null,
      setAuth: (data) => {
        set({
          user: data.user,
          accessToken: data.accessToken,
          sessionId: data.sessionId,
        });
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          sessionId: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        sessionId: state.sessionId,
      }),
    }
  )
);
