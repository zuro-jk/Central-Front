import { useCartStore } from "@/core/stores/cart/cart.store";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-800 rounded-2xl p-8 text-center shadow-2xl border border-neutral-700">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2">¡Pago Exitoso!</h1>
        <p className="text-gray-400 mb-8">
          Tu orden ha sido confirmada y ya se está preparando en cocina.
        </p>

        <div className="space-y-4">
          <Link
            to="/menu"
            className="block w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
          >
            Volver al Menú
          </Link>

          <button
            onClick={() => navigate("/")}
            className="block w-full py-3 px-4 bg-transparent border border-neutral-600 hover:bg-neutral-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={20} />
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
