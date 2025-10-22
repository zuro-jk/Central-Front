import { z } from "zod";

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, "El username o correo es obligatorio")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_.-]+$/.test(val),
      "Debe ser un correo válido o un nombre de usuario"
    ),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
