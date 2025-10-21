import { Link } from "react-router-dom";
import { useAuthStore } from "@/core/stores/authStore";
import Button from "../ui/Button";

function UserSection() {
  const { user, isLoggedIn, logout } = useAuthStore();

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm">Hola, {user.name}</span>
        {user.role === 'admin' && (
          <Link to="/admin/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-700 hover:bg-red-800 rounded transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <>
      <Link to="/auth/login">
        <Button>Iniciar Sesión</Button>
      </Link>
      <Link to="/auth/signup">
        <Button>Registrarse</Button>
      </Link>
    </>
  );
}

function PublicHeader() {
  return (
    <header className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-md">
      <div className="flex justify-between items-center h-16 container mx-auto">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-xl font-bold tracking-wide">Foráneos</span>
        </div>

        <nav className="hidden md:flex space-x-10 font-medium gap-4">
          <a
            href="/"
            className="hover:text-yellow-100 transition"
          >
            Inicio
          </a>
          <a
            href="/menu"
            className="hover:text-yellow-100 transition"
          >
            Menú
          </a>
          <a
            href="/reservations"
            className="hover:text-yellow-100 transition"
          >
            Reservas
          </a>
          <a
            href="/contact"
            className="hover:text-yellow-100 transition"
          >
            Contacto
          </a> 
        </nav>

        <div className="flex items-center space-x-3 p-4">
          <UserSection />
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
