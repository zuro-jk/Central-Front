import type { CartItem } from "@/core/stores/cart/cart.store";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  isLoading: boolean;
  isUserLoggedIn: boolean;
  onRemoveItem: (id: string) => void;
  onProcessOrder: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  deliveryFee,
  total,
  isLoading,
  isUserLoggedIn,
  onRemoveItem,
  onProcessOrder,
}: OrderSummaryProps) {
  return (
    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 shadow-lg sticky top-24 overflow-hidden flex flex-col h-full max-h-[calc(100vh-8rem)]">
      <div className="p-6 border-b border-neutral-700 bg-neutral-800 z-10">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingBag
            className="text-red-500"
            size={20}
          />{" "}
          Resumen
        </h2>
      </div>

      {/* Lista Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.cartItemId}
            className="flex gap-4 group"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={item.product.imageUrl || "https://via.placeholder.com/150"}
                alt={item.product.name}
                className="w-full h-full object-cover bg-neutral-700 transition-transform group-hover:scale-110"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm text-white line-clamp-2 leading-tight">
                  {item.product.name}
                </h4>
                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1 -mr-2"
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-400">
                Cant:{" "}
                <span className="text-white font-bold">{item.quantity}</span>
              </p>

              {item.selectedExtras.length > 0 && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  + {item.selectedExtras.map((e) => e.name).join(", ")}
                </p>
              )}

              <div className="text-red-500 font-bold text-sm mt-1">
                S/ {(item.finalPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer con Totales y Botón */}
      <div className="p-6 bg-neutral-900 border-t border-neutral-700 space-y-3 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>Costo de envío</span>
          <span>S/ {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-neutral-700">
          <span>Total</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>

        {isUserLoggedIn ? (
          <button
            onClick={onProcessOrder}
            disabled={isLoading}
            className="w-full mt-4 bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-900/40 hover:bg-red-700 hover:shadow-red-900/60 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </>
            ) : (
              "Confirmar Pedido"
            )}
          </button>
        ) : (
          <Link
            to="/auth/login"
            className="block w-full mt-4 bg-neutral-700 text-white py-4 rounded-xl font-bold text-center hover:bg-neutral-600 transition-colors border border-neutral-600"
          >
            Iniciar Sesión para Pagar
          </Link>
        )}
      </div>
    </div>
  );
}
