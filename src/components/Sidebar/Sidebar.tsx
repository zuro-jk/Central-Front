import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md transition-colors ${
      isActive ? "bg-red-600 text-white" : "text-red-700 hover:bg-red-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
      <div className="text-2xl font-bold text-red-700 mb-6">Admin</div>
      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkCls} end>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkCls}>
          Menú
        </NavLink>
        <NavLink to="/admin/reports" className={linkCls}>
          Reportes
        </NavLink>
        <NavLink to="/admin/users" className={linkCls}>
          Usuarios
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
