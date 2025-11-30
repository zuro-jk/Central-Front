import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyCartView() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-neutral-800 p-8 rounded-2xl flex flex-col items-center text-center max-w-md w-full shadow-2xl border border-neutral-700 animate-fade-in-up">
        <div className="bg-neutral-700/50 p-6 rounded-full mb-6">
          <ShoppingBag
            size={48}
            className="text-gray-400"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-8">
          Parece que aún no has agregado ningún plato delicioso.
        </p>
        <Link
          to="/menu"
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors block"
        >
          Volver al Menú
        </Link>
      </div>
    </div>
  );
}
