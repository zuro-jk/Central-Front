import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .nonempty("El nombre completo es obligatorio"),
    email: z
      .string()
      .email("El correo electrónico no es válido")
      .nonempty("El correo es obligatorio"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .nonempty("La contraseña es obligatoria"),
    confirmPassword: z.string().nonempty("Debes confirmar tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
