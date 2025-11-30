import { useSignupMutation } from "@/core/hooks/auth/useAuth.hooks";
import {
  signupSchema,
  type SignupSchema,
} from "@/core/schemas/auth/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const { mutate, isPending } = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupSchema) => {
    const parts = data.fullName.trim().split(/\s+/);
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ") || "-";

    const username = data.email.split("@")[0];

    const payload = {
      username,
      email: data.email,
      password: data.password,
      firstName,
      lastName,
    };

    mutate(payload);
  };

  return (
    <div className="w-full min-h-screen grid place-items-center bg-neutral-900 text-white p-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-900/50">
            🍴
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Crea tu cuenta en <span className="text-red-500">Central</span>
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-700 focus:ring-red-600"
              }`}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-neutral-700 focus:ring-red-600"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all pr-12 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-neutral-700 focus:ring-red-600"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPwd ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all pr-12 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-neutral-700 focus:ring-red-600"
                }`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showConfirmPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-red-900/30 hover:bg-red-700 hover:shadow-red-900/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registrando...
              </span>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/auth/login"
            className="text-red-500 font-bold hover:text-red-400 transition-colors hover:underline"
          >
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
