// src/components/Header/PublicHeader.tsx

import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/core/stores/auth.store";

function UserSectionMenu() {
  const { user, accessToken, logout } = useAuthStore();
  const isLoggedIn = Boolean(accessToken && user);

  if (isLoggedIn && user) {
    return (
      <div className="py-2">
        <div className="px-4 py-2 text-sm text-gray-300">
          Hola,{" "}
          <span className="font-semibold text-white">
            {user.firstName || user.username}
          </span>
        </div>

        {user.roles?.includes("ROLE_ADMIN") && (
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
          >
            Dashboard
          </Link>
        )}

        <button
          onClick={logout}
          className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="py-2">
      <Link
        to="/auth/login"
        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/auth/signup"
        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition"
      >
        Registrarse
      </Link>
    </div>
  );
}

export default function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#202020] text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/inicio/centralLogo.png"
            alt="Foraneos Logo"
            className="w-50 h-15 object-contain"
          />
        </div>

        {/* Navegación + menú */}
        <div className="relative flex flex-row gap-4" ref={menuRef}>
          {/* Links visibles siempre */}
          <nav className="flex gap-6 items-center text-gray-200">
            <Link to="/">Inicio</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/reservations">Reservas</Link>
            <Link to="/contact">Contacto</Link>
          </nav>

          {/* Botón hamburguesa SIEMPRE visible */}
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
            >
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-red-600 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>
            
          {/* Dropdown del menú hamburguesa: aquí va login/register */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-lg">
              <UserSectionMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
