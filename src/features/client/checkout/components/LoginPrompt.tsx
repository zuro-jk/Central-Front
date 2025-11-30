import { LogIn, ShoppingBag, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPrompt() {
  return (
    <div className="bg-neutral-800 p-8 rounded-2xl border border-neutral-700 shadow-lg text-center py-12 animate-fade-in-up">
      <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag
          size={40}
          className="text-gray-400"
        />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-white">
        Inicia sesión para continuar
      </h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
        Para procesar tu envío y asegurar que tu pedido llegue correctamente,
        necesitamos que te identifiques.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/auth/login"
          className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-transform active:scale-95 shadow-lg shadow-red-900/20"
        >
          <LogIn size={20} /> Iniciar Sesión
        </Link>
        <Link
          to="/auth/signup"
          className="flex items-center justify-center gap-2 bg-transparent border border-neutral-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
        >
          <UserPlus size={20} /> Crear Cuenta
        </Link>
      </div>
    </div>
  );
}
