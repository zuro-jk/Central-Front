import { useState } from "react";
import http from "../../../api/http";

type LoginResponse = {
  accessToken?: string;
  token?: string;
  jwt?: string;
};
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("Por favor completa ambos campos.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await http.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const token = data.accessToken || data.token || data.jwt;
      if (!token) throw new Error("Token no recibido");

      remember
        ? localStorage.setItem("access_token", token)
        : sessionStorage.setItem("access_token", token);

      alert("✅ Inicio de sesión exitoso!");
    } catch (error: any) {
      setErr(
        error?.response?.status === 401
          ? "Credenciales incorrectas."
          : "Error al iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };
  const EYE_OPEN  = "/images/icons/eyes-off.png";
  const EYE_OFF   = "/images/icons/eyes-open.png";

  return (
    <div className="w-full min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            🍴
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Inicia sesión en <span className="text-red-600">Foráneos</span>
        </h2>

        {/* Formulario */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <img
                  src={
                    showPwd
                      ? EYE_OFF
                      : EYE_OPEN
                  }
                  alt="Ver contraseña"
                  width={18}
                  height={18}
                />
              </button>
            </div>
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
            <a href="#" className="text-red-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {err && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
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