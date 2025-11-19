import { api } from "@/core/api/api";
import { useState } from "react";

type RegisterResponse = {
  success?: boolean;
  message?: string;
  data?: number; // id del usuario creado
};

const REGISTER_ENDPOINT = "/api/v1/auth/register";

// íconos locales
const EYE_OPEN = "/images/icons/eyes-open.png";
const EYE_OFF = "/images/icons/eyes-off.png";

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
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <div className="flex justify-center mb-6">
        <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          🍴
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Crea tu cuenta en <span className="text-red-600">Foráneos</span>
      </h2>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

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
              onClick={() => setShowPwd((s) => !s)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
              title={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <img
                src={showPwd ? EYE_OPEN : EYE_OFF} // ojo tachado cuando se muestra el texto
                width={20}
                height={20}
                className="object-contain"
                alt=""
              />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <div className="relative">
            <input
              type={showPwd2 ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPwd2((s) => !s)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={
                showPwd2 ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              title={showPwd2 ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <img
                src={showPwd2 ? EYE_OPEN : EYE_OFF}
                width={20}
                height={20}
                className="object-contain"
                alt=""
              />
            </button>
          </div>
        </div>

        {err && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
            {err}
          </p>
        )}
        {ok && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 p-2 rounded">
            {ok}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        ¿Ya tienes una cuenta?{" "}
        <a
          href="/auth/login"
          className="text-red-600 font-semibold hover:underline"
        >
          Inicia sesión
        </a>
      </div>
    </div>
  );
}

export default Signup;
