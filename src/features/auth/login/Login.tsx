import { useLoginMutation } from "@/core/hooks/useLoginMutation";
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
    <div className="w-full min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            🍴
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Inicia sesión en <span className="text-red-600">Central</span>
        </h2>

        {/* Formulario */}
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username / Email
            </label>
            <input
              type="text"
              placeholder="Usuario o correo"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.usernameOrEmail
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              {...register("usernameOrEmail")}
            />
            {errors.usernameOrEmail && (
              <p className="text-sm text-red-600 mt-1">
                {errors.usernameOrEmail.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              {...register("password")}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a
              href="#"
              className="text-red-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {isPending ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a
            href="/auth/signup"
            className="text-red-600 font-semibold hover:underline"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
