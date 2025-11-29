import type { CartItemDraft } from "@/core/stores/cart/cart.store";
import type { ProductResponse } from "@/core/types/products/products.model";
import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductDrawerProps {
  dish: ProductResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: CartItemDraft) => void;
}
export default function ProductDrawer({
  dish,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDrawerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState<number[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setQuantity(1);
      setSelectedExtraIds([]);
      setNotes("");
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;
  if (!dish) return null;

  const toggleExtra = (extraId: number) => {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateTotal = () => {
    const basePrice = Number(dish.price);

    const extrasTotal = selectedExtraIds.reduce((total, id) => {
      const extra = dish.extras?.find((e) => e.id === id);
      return total + (extra ? Number(extra.price) : 0);
    }, 0);

    return Number(((basePrice + extrasTotal) * quantity).toFixed(2));
  };

  const totalPrice = calculateTotal();

  const handleAddToCart = () => {
    const cartItem = {
      product: dish,
      quantity,
      selectedExtras:
        dish.extras?.filter((e) => selectedExtraIds.includes(e.id)) || [],
      notes,
      finalPrice: totalPrice,
    };

    console.log("Item para el carrito:", cartItem); 

    if (onAddToCart) onAddToCart(cartItem);

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md h-full bg-neutral-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out border-l border-neutral-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-64 shrink-0">
          <img
            src={dish.imageUrl || "https://via.placeholder.com/400x300"}
            alt={dish.name}
            className="w-full h-full object-cover mask-image-gradient"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg group"
            aria-label="Cerrar"
          >
            <div className="group-hover:rotate-90 transition-transform duration-200">
              <X />
            </div>
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2 py-1 mb-2 text-xs font-bold text-white bg-red-600 rounded uppercase tracking-wider">
              {dish.categoryName || "Especial"}
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow-md">
              {dish.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <p className="text-gray-300 text-base leading-relaxed">
              {dish.description || "Descripción no disponible."}
            </p>
            <div className="mt-3 flex items-center gap-2 text-amber-500 font-semibold">
              <span>⏱ {dish.preparationTimeMinutes || 15} min</span>
              <span>•</span>
              <span className="text-gray-400 font-normal">
                Precio base: S/ {dish.price}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
              Cantidad
            </label>
            <div className="flex items-center justify-between bg-neutral-800 rounded-xl p-2 border border-neutral-700">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors"
              >
                <Minus />
              </button>
              <span className="text-2xl font-bold text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center bg-neutral-700 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Plus />
              </button>
            </div>
          </div>

          {dish.extras && dish.extras.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
                Adicionales
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dish.extras.map((extra) => {
                  const isSelected = selectedExtraIds.includes(extra.id);
                  return (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 flex items-center justify-between group ${
                        isSelected
                          ? "bg-red-600/10 border-red-600 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]"
                          : "bg-neutral-800 border-neutral-700 text-gray-400 hover:border-gray-500 hover:bg-neutral-700"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span>{extra.name}</span>
                        <span className="text-xs opacity-70 font-normal">
                          + S/ {Number(extra.price).toFixed(2)}
                        </span>
                      </div>

                      {isSelected ? (
                        <span className="text-red-500 font-bold bg-red-600/20 p-1 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-gray-600 group-hover:border-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
              Instrucciones Especiales
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Sin cebolla, salsas aparte..."
              className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none h-24"
            />
          </div>
        </div>

        <div className="p-6 bg-neutral-900 border-t border-neutral-800 sticky bottom-0 z-10 pb-8 sm:pb-6">
          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-900/40 hover:bg-red-700 hover:shadow-red-900/60 transition-all transform active:scale-[0.98] flex justify-between items-center px-6"
          >
            <span>Agregar al Pedido</span>
            <span className="bg-black/20 px-3 py-1 rounded-lg tabular-nums">
              S/ {totalPrice}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
