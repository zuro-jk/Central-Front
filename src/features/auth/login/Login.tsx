import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data?.access_token || res.data?.token;
      if (!token) throw new Error("No se recibió token");
      localStorage.setItem("access_token", token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error de autenticación";
      setError(String(msg));
    } finally {
      setLoading(false);
    }
  }
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
          Inicia sesión en <span className="text-red-600">Foráneos</span>
        </h2>

      {/* Formulario */}
      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-gray-300"
              />
              Recuérdame
            </label>
            <a
              href="#"
              className="text-red-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
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
