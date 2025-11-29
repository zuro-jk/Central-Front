import { useAuthStore } from "@/core/stores/auth/auth.store";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function Sidebar() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-red-600 text-white" : "text-red-700 hover:bg-red-100"
    }`;

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col justify-between">
      <div>
        {/* Header / User info */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-red-700 mb-2">
            Central de Administración
          </div>

          {user ? (
            <div className="bg-red-50 p-3 rounded-lg border border-red-100">
              <p className="font-semibold text-red-700">
                {user.fullName || user.username}
              </p>
              {/* <p className="text-sm text-gray-600">
                {user.roles?.join(", ") || "Sin rol"}
              </p> */}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No hay usuario activo
            </p>
          )}
        </div>

        {/* Nav links */}
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={linkCls}
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={linkCls}
          >
            Menú
          </NavLink>
          <NavLink
            to="/admin/reports"
            className={linkCls}
          >
            Reportes
          </NavLink>
          <NavLink
            to="/admin/users"
            className={linkCls}
          >
            Usuarios
          </NavLink>
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Cerrar sesión
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
