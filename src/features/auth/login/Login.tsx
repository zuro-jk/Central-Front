import { useLoginMutation } from "@/core/hooks/auth/useLoginMutation";
import type { LoginSchema } from "@/core/schemas/loginSchema";
import { loginSchema } from "@/core/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function Login() {
  const { mutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => mutate(data);

  return (
    <div className="w-full min-h-screen grid place-items-center bg-neutral-900 text-white p-4">
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-red-900/50">
            🍴
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Bienvenido
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Inicia sesión en{" "}
          <span className="text-red-500 font-bold">Central</span>
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username / Email
            </label>
            <input
              type="text"
              placeholder="ej. admin@central.com"
              className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.usernameOrEmail
                  ? "border-red-500 focus:ring-red-500 focus:border-transparent"
                  : "border-neutral-700 focus:ring-red-600 focus:border-transparent"
              }`}
              {...register("usernameOrEmail")}
            />
            {errors.usernameOrEmail && (
              <p className="text-sm text-red-500 mt-1 font-medium">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-transparent"
                  : "border-neutral-700 focus:ring-red-600 focus:border-transparent"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg shadow-red-900/30 hover:bg-red-700 hover:shadow-red-900/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
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
                Ingresando...
              </span>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <a
            href="/auth/signup"
            className="text-red-500 font-bold hover:text-red-400 transition-colors hover:underline"
          >
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
