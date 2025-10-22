import { useState } from "react";
import type { Dish } from "../Types/dish";

interface ProductDrawerProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDrawer({
  dish,
  isOpen,
  onClose,
}: ProductDrawerProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");

  const toggleExtra = (extra: string) => {
    setExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

  if (!isOpen) return null; // Si no está abierto no renderiza nada

  return (
    <div className="fixed inset-0 z-50 flex transition-opacity duration-300 opacity-100">
      {/* Overlay (Tailwind v4 syntax) */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer lateral */}
      <div className="relative ml-auto w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto transform transition-transform duration-300 translate-x-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-44 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-red-700">{dish.name}</h2>
        <p className="text-gray-600 mb-2">{dish.description}</p>
        <p className="text-lg font-semibold text-amber-500 mb-4">
          {dish.price}
        </p>

        {/* Cantidad */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-semibold">Cantidad:</span>
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* Extras */}
        <div className="mb-4">
          <span className="font-semibold">Extras:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {["Arroz extra", "Papas fritas", "Ensalada", "Bebida"].map(
              (extra) => (
                <button
                  key={extra}
                  onClick={() => toggleExtra(extra)}
                  className={`px-3 py-1 rounded-full border ${
                    extras.includes(extra)
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {extra}
                </button>
              )
            )}
          </div>
        </div>

        {/* Notas */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notas especiales (ej: sin cebolla, poco picante...)"
          className="w-full border rounded-lg p-2 text-gray-700 mb-4"
        />

        <button
          className="mt-auto w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
          onClick={() =>
            alert(
              `Agregado ${quantity}x ${dish.name}. Extras: ${
                extras.join(", ") || "ninguno"
              }. Notas: ${notes || "Ninguna"}.`
            )
          }
        >
          Agregar por {dish.price}
        </button>
      </div>
    </div>
  );
}
