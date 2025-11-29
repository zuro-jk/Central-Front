import { api } from "@/core/api/api";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: number; // id del usuario creado
};

const REGISTER_ENDPOINT = "/api/v1/auth/register";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!fullName.trim() || !email.trim() || !password || !confirm) {
      setErr("Completa todos los campos.");
      return;
    }
    if (password.length < 8) {
      setErr("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setErr("Las contraseñas no coinciden.");
      return;
    }

    const parts = fullName.trim().split(/\s+/);
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ") || "-";

    const payload = {
      username: email.split("@")[0],
      email,
      password,
      firstName,
      lastName,
    };

    try {
      setLoading(true);

      const { data } = await api.post<RegisterResponse>(
        REGISTER_ENDPOINT,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setOk(
        data?.message ||
          "Cuenta creada. Revisa tu correo para activar la cuenta."
      );
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.errors?.[0]?.defaultMessage ||
        (e?.response?.status === 409
          ? "El correo/usuario ya existe."
          : "No se pudo registrar.");
      setErr(msg);
      console.error("Register error:", e?.response?.data || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid place-items-center bg-neutral-900 text-white p-4">
      {/* Tarjeta oscura */}
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-neutral-700">
        {/* Logo */}
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
          onSubmit={handleSubmit}
        >
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Correa electrónico
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPwd ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd2 ? "text" : "password"}
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPwd2((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                {showPwd2 ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Mensajes de Error / Éxito */}
          {err && (
            <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm text-center">
              {err}
            </div>
          )}
          {ok && (
            <div className="p-3 rounded-lg bg-green-900/20 border border-green-800/50 text-green-400 text-sm text-center">
              {ok}
            </div>
          )}

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-red-900/30 hover:bg-red-700 hover:shadow-red-900/50 transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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

        {/* Footer */}
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
