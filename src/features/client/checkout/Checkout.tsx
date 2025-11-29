import LocationPicker from "@/components/Maps/LocationPicker";
import { useAuthStore } from "@/core/stores/auth/auth.store";
import { useCartStore } from "@/core/stores/cart/cart.store";
import {
  Banknote,
  ChevronLeft,
  CreditCard,
  Map,
  MapPin,
  ShoppingBag,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { items, getTotalPrice, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "yape">(
    "card"
  );

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [phone, setPhone] = useState("");
  const [references, setReferences] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (user) {
      console.log("Usuario detectado en checkout:", user);
    }
  }, [user]);

  const handleLocationSelect = (
    selectedAddress: string,
    lat: number,
    lng: number
  ) => {
    setAddress(selectedAddress);
    setCoordinates({ lat, lng });
  };

  const handleConfirmMap = () => {
    if (!coordinates) {
      toast.error("Selecciona una ubicación en el mapa");
      return;
    }
    setIsMapOpen(false);
  };

  const handlePlaceOrder = async () => {
    if (!address.trim() || !coordinates) {
      toast.error("Por favor selecciona tu dirección en el mapa");
      return;
    }
    if (!phone.trim()) {
      toast.error("Ingresa un teléfono de contacto");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const orderData = {
        userId: user?.id || null,
        items,
        total,
        deliveryData: {
          address,
          coordinates,
          phone,
          references,
        },
        paymentMethod,
      };

      console.log("Orden Enviada:", orderData);
      setIsLoading(false);
      clearCart();
      toast.success("¡Orden creada exitosamente!");
      navigate("/menu");
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-neutral-800 p-8 rounded-2xl flex flex-col items-center text-center max-w-md w-full shadow-2xl border border-neutral-700">
          <div className="bg-neutral-700/50 p-6 rounded-full mb-6">
            <ShoppingBag
              size={48}
              className="text-gray-400"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-8">
            Parece que aún no has agregado ningún plato delicioso a tu orden.
          </p>
          <Link
            to="/menu"
            className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            Volver al Menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-900 text-white pt-24 pb-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/menu"
            className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-neutral-700 pb-4">
                <MapPin className="text-red-500" />
                <h2 className="text-xl font-bold">Información de Entrega</h2>
              </div>

              <div className="grid gap-6">
                {/* Botón para abrir Mapa vs Input de texto */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Dirección de entrega
                  </label>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white flex items-center justify-between">
                      <span
                        className={address ? "text-white" : "text-gray-500"}
                      >
                        {address || "Selecciona tu ubicación..."}
                      </span>
                      {coordinates && (
                        <MapPin
                          size={16}
                          className="text-green-500"
                        />
                      )}
                    </div>

                    <button
                      onClick={() => setIsMapOpen(true)}
                      className="bg-neutral-700 hover:bg-neutral-600 text-white p-3 rounded-xl border border-neutral-600 transition-colors flex items-center gap-2"
                      title="Abrir mapa"
                    >
                      <Map size={20} />
                      <span className="hidden sm:inline">Mapa</span>
                    </button>
                  </div>
                  {address && (
                    <p className="text-xs text-gray-500 mt-1">
                      Coordenadas: {coordinates?.lat.toFixed(4)},{" "}
                      {coordinates?.lng.toFixed(4)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Referencia (Opcional)
                    </label>
                    <input
                      type="text"
                      value={references}
                      onChange={(e) => setReferences(e.target.value)}
                      placeholder="Frente al parque..."
                      className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Teléfono de contacto
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="999 999 999"
                      className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 shadow-lg">
              <div className="flex items-center gap-3 mb-6 border-b border-neutral-700 pb-4">
                <CreditCard className="text-red-500" />
                <h2 className="text-xl font-bold">Método de Pago</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === "card"
                      ? "bg-red-600/10 border-red-600 text-red-500"
                      : "bg-neutral-900 border-neutral-600 hover:border-gray-400"
                  }`}
                >
                  <CreditCard size={32} />
                  <span className="font-semibold text-sm">
                    Tarjeta (Online)
                  </span>
                </div>

                <div
                  onClick={() => setPaymentMethod("yape")}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === "yape"
                      ? "bg-red-600/10 border-red-600 text-red-500"
                      : "bg-neutral-900 border-neutral-600 hover:border-gray-400"
                  }`}
                >
                  <Smartphone size={32} />
                  <span className="font-semibold text-sm">Yape / Plin</span>
                </div>

                <div
                  onClick={() => setPaymentMethod("cash")}
                  className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                    paymentMethod === "cash"
                      ? "bg-red-600/10 border-red-600 text-red-500"
                      : "bg-neutral-900 border-neutral-600 hover:border-gray-400"
                  }`}
                >
                  <Banknote size={32} />
                  <span className="font-semibold text-sm">Contraentrega</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-neutral-900/50 rounded-lg text-sm text-gray-400">
                {paymentMethod === "card" &&
                  "Serás redirigido a la pasarela de pago segura al confirmar."}
                {paymentMethod === "yape" &&
                  "Te mostraremos el QR al confirmar el pedido."}
                {paymentMethod === "cash" &&
                  "Pagas en efectivo al recibir tu pedido."}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-neutral-800 rounded-2xl border border-neutral-700 shadow-lg sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-neutral-700">
                <h2 className="text-xl font-bold">Resumen de Orden</h2>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-4"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-neutral-700"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-sm line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Cant: {item.quantity}
                      </p>

                      {item.selectedExtras.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
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

              {/* Totales */}
              <div className="p-6 bg-neutral-900/50 border-t border-neutral-700 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Costo de envío</span>
                  <span>S/ {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-neutral-700">
                  <span>Total</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full mt-6 bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-900/40 hover:bg-red-700 hover:shadow-red-900/60 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Confirmar Pedido"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMapOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMapOpen(false)}
          ></div>
          <div className="relative bg-neutral-900 w-full max-w-2xl rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">Selecciona tu ubicación</h3>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <LocationPicker
                onLocationSelect={handleLocationSelect}
                initialLat={coordinates?.lat}
                initialLng={coordinates?.lng}
              />
            </div>

            <div className="p-4 border-t border-neutral-800 flex justify-end gap-3 bg-neutral-900">
              <button
                onClick={() => setIsMapOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-neutral-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmMap}
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
              >
                Confirmar Ubicación
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
