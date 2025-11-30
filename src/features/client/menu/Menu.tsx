import { useMenuData } from "@/core/hooks/menu/useMenuData";
import {
  useCartStore,
  type CartItemDraft,
} from "@/core/stores/cart/cart.store";
import type { ProductResponse } from "@/core/types/products/products.model";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ProductDrawer from "./components/product-drawer/ProductDrawer";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const { categories, products, isLoading } = useMenuData();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedDish, setSelectedDish] = useState<ProductResponse | null>(
    null
  );

  const addItemToCart = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const filteredProducts =
    selectedCategoryId === 0
      ? products?.data
      : products?.data.filter((p) => p.categoryId === selectedCategoryId);

  const handleOpen = (dish: ProductResponse) => setSelectedDish(dish);
  const handleClose = () => setSelectedDish(null);

  const handleAddToCartFromDrawer = (item: CartItemDraft) => {
    addItemToCart(item);
    toast.success(`Agregado: ${item.quantity}x ${item.product.name}`, {
      position: "bottom-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  return (
    <section className="pt-32 pb-20 px-4 md:px-10 bg-neutral-900 text-white min-h-screen">
      {totalItems > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-2xl shadow-red-900/50 hover:bg-red-700 hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <div className="relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
              {totalItems}
            </span>
          </div>
          <span className="font-bold pr-1">S/ {totalPrice.toFixed(2)}</span>
        </button>
      )}

      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Nuestro Menú
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
          Una selección curada de sabores que rinden homenaje a nuestra
          biodiversidad.
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-16 flex-wrap sticky top-24 z-30 py-4 bg-neutral-900/80 backdrop-blur-md transition-all">
        <button
          onClick={() => setSelectedCategoryId(0)}
          className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base border ${
            selectedCategoryId === 0
              ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transform scale-105"
              : "bg-neutral-800 border-neutral-700 text-gray-400 hover:border-gray-500 hover:text-white"
          }`}
        >
          Todos
        </button>

        {!isLoading &&
          categories?.data?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base border ${
                selectedCategoryId === cat.id
                  ? "bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transform scale-105"
                  : "bg-neutral-800 border-neutral-700 text-gray-400 hover:border-gray-500 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}

        {isLoading &&
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-neutral-800 rounded-full animate-pulse"
            ></div>
          ))}
      </div>

      <div className="max-w-7xl mx-auto min-h-[500px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-neutral-800 rounded-2xl h-[400px] animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts?.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                <p className="text-2xl font-light">
                  No hay platos disponibles en esta categoría.
                </p>
              </div>
            )}

            {filteredProducts?.map((dish) => (
              <div
                key={dish.id}
                className="group relative bg-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col border border-neutral-700 hover:border-red-500/30 hover:-translate-y-2"
              >
                <div
                  className="relative h-60 overflow-hidden cursor-pointer"
                  onClick={() => handleOpen(dish)}
                >
                  <img
                    src={
                      dish.imageUrl ||
                      "https://via.placeholder.com/400x300?text=Sin+Imagen"
                    }
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Error";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-xs font-bold text-white px-2 py-1 rounded border border-white/10">
                    {dish.categoryName}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-xl font-bold text-white group-hover:text-red-500 transition-colors cursor-pointer"
                      onClick={() => handleOpen(dish)}
                    >
                      {dish.name}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                    {dish.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-neutral-700 pt-4 mt-auto">
                    <span className="text-2xl font-bold text-amber-500">
                      S/ {dish.price?.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 text-sm" />
                      <span className="text-sm font-medium text-gray-300">
                        {dish.rating || 5.0}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpen(dish)}
                    className="mt-4 w-full py-2 rounded-lg bg-neutral-700 text-white font-semibold hover:bg-red-600 hover:text-white transition-all text-sm uppercase tracking-wide"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductDrawer
        dish={selectedDish}
        isOpen={Boolean(selectedDish)}
        onClose={handleClose}
        onAddToCart={handleAddToCartFromDrawer}
      />
    </section>
  );
}

export default Menu;
