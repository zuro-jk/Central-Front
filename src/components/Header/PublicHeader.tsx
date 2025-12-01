import { useAuthStore } from "@/core/stores/auth/auth.store";
import type { UserResponse } from "@/core/types/user/user.model";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserAvatar = ({
  user,
  onClick,
}: {
  user: UserResponse;
  onClick?: () => void;
}) => {
  const getInitials = () => {
    const first = user.firstName?.charAt(0).toUpperCase() || "";
    const last = user.lastName?.charAt(0).toUpperCase() || "";
    return `${first}${last}`;
  };

  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 hover:border-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
    >
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={user.username}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white font-bold text-sm">
          {getInitials()}
        </div>
      )}
    </button>
  );
};

const UserDropdown = ({
  user,
  logout,
  closeMenu,
}: {
  user: UserResponse;
  logout: () => void;
  closeMenu: () => void;
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/auth/login");
  };

  return (
    <div className="absolute right-0 mt-3 w-72 bg-[#1a1a1a] border border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-50 transform origin-top-right transition-all">
      <div className="p-4 border-b border-neutral-700 bg-[#252525]">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} />
          <div className="overflow-hidden">
            <p className="text-white font-bold truncate text-sm">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-400 text-xs truncate">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="py-2">
        <Link
          to="/profile"
          onClick={closeMenu}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle
              cx="12"
              cy="7"
              r="4"
            />
          </svg>
          Mi Perfil
        </Link>

        <Link
          to="/my-orders"
          onClick={closeMenu}
          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="8"
              cy="21"
              r="1"
            />
            <circle
              cx="19"
              cy="21"
              r="1"
            />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          Mis Pedidos
        </Link>

        {user.roles?.includes("ROLE_ADMIN") && (
          <Link
            to="/admin/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 text-sm text-yellow-500 hover:bg-neutral-800 hover:text-yellow-400 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                width="18"
                height="18"
                x="3"
                y="3"
                rx="2"
                ry="2"
              />
              <line
                x1="3"
                x2="21"
                y1="9"
                y2="9"
              />
              <line
                x1="9"
                x2="9"
                y1="21"
                y2="9"
              />
            </svg>
            Panel Administrativo
          </Link>
        )}
      </div>

      <div className="border-t border-neutral-700 p-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line
              x1="21"
              x2="9"
              y1="12"
              y2="12"
            />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default function PublicHeader() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#202020] text-white shadow-lg border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img
                src="/images/inicio/centralLogo.png"
                alt="Central Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Menú
            </Link>
            <Link
              to="/reservations"
              className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Reservas
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium uppercase tracking-wider"
            >
              Contacto
            </Link>
          </nav>

          <div
            className="hidden md:flex items-center gap-4 relative"
            ref={menuRef}
          >
            {user ? (
              <div className="relative">
                <UserAvatar
                  user={user}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                {isMenuOpen && (
                  <UserDropdown
                    user={user}
                    logout={logout}
                    closeMenu={() => setIsMenuOpen(false)}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/auth/login"
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg shadow-red-900/30 text-sm"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800"
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800"
            >
              Menú
            </Link>
            <Link
              to="/reservations"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800"
            >
              Reservas
            </Link>

            <div className="border-t border-neutral-700 mt-4 pt-4 pb-2">
              {user ? (
                <>
                  <div className="flex items-center px-3 mb-3">
                    <UserAvatar user={user} />
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.fullName}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-neutral-800"
                  >
                    Mis Pedidos
                  </Link>
                  {user.roles?.includes("ROLE_ADMIN") && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-yellow-500 hover:text-yellow-400 hover:bg-neutral-800"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-neutral-800"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="px-3 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-neutral-700 hover:bg-neutral-600"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
