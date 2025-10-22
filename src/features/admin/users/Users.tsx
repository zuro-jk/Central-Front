import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

interface AdminUserRow {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  provider?: string;
  enabled: boolean;
  hasPassword?: boolean;
  emailVerified?: boolean;
}

// Roles fijos en datos, sin UI de edición de rol.

function Users() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [query, setQuery] = useState("");
  const [needsToken, setNeedsToken] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Cargar usuarios reales si hay token
  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("access_token");
    if (!token) {
      setNeedsToken(true);
      return;
    }
    (async () => {
      try {
        const res = await api.get("/api/v1/users/admin", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Esperado: { success, message, data: UserProfileResponse[] }
        const data = (res.data?.data || []) as Array<any>;
        const mapped: AdminUserRow[] = data.map((u) => ({
          id: String(u.id ?? crypto.randomUUID()),
          username: String(u.username || ""),
          email: String(u.email || ""),
          firstName: String(u.firstName || ""),
          lastName: String(u.lastName || ""),
          provider: u.provider,
          enabled: Boolean(u.enabled !== false),
          hasPassword: Boolean(u.hasPassword),
          emailVerified: Boolean(u.emailVerified),
        }));
        if (mounted && mapped.length) setUsers(mapped);
      } catch (_) {
        if (mounted) setLoadError(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const byQ = [u.username, u.email, u.firstName, u.lastName]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      return byQ;
    });
  }, [users, query]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">Usuarios</h1>
        <div className="flex gap-2">
          <input className="border rounded-md px-3 py-2 w-64" placeholder="Buscar por usuario, email o nombre..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {needsToken && (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-3">
          Requiere token para cargar usuarios. Guarda un JWT en localStorage:<br />
          <code>localStorage.setItem('access_token', 'TU_JWT')</code>
        </div>
      )}
      {loadError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3">
          Error al cargar usuarios. Verifica tu token y permisos (ADMIN o permitido por el endpoint).
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Usuario</th>
              <th className="p-3">Email</th>
              <th className="p-3">Email verificado</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Proveedor</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Password</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-sm text-gray-500">Sin datos</td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-gray-100 text-sm">
                <td className="p-3 font-medium text-red-700">{u.username}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.emailVerified ? "Sí" : "No"}</td>
                <td className="p-3">{u.firstName}</td>
                <td className="p-3">{u.lastName}</td>
                <td className="p-3">{u.provider || "—"}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${u.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {u.enabled ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="p-3">{u.hasPassword ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
