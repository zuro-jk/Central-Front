import { useAuthStore } from "@/core/stores/auth.store";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function UserSection() {
  const { user, accessToken, logout } = useAuthStore();

  const isLoggedIn = Boolean(accessToken && user);

  if (isLoggedIn && user) {
    const isAdmin = user.roles?.includes("ROLE_ADMIN");

    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm">Hola, {user.firstName || user.username}</span>
        {isAdmin && (
          <Link to="/admin/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
        <Button
          onClick={logout}
          variant="outline"
          className="text-white hover:text-black"
        >
          Cerrar sesión
        </Button>
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
        {/* Logo */}
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

        {/* Nav links */}
        <nav className="hidden md:flex space-x-10 font-medium gap-4">
          <Link
            to="/"
            className="hover:text-yellow-100 transition"
          >
            Inicio
          </Link>
          <Link
            to="/menu"
            className="hover:text-yellow-100 transition"
          >
            Menú
          </Link>
          <Link
            to="/reservations"
            className="hover:text-yellow-100 transition"
          >
            Reservas
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-100 transition"
          >
            Contacto
          </Link>
        </nav>

        {/* User section */}
        <div className="flex items-center space-x-3 p-4">
          <UserSection />
        </div>
      </div>
    </header>
  );
}

export default PublicHeader;
