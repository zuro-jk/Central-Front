import { useNiubizScript } from "@/core/hooks/order/useNiubizScript";
import { useCreateOrderMutation } from "@/core/hooks/order/useOrder.hook";
import { paymentService } from "@/core/services/payment/payment.service";
import { useAuthStore } from "@/core/stores/auth/auth.store";
import { useCartStore } from "@/core/stores/cart/cart.store";
import type { OrderRequest } from "@/core/types/order/order.model";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeliveryForm from "./components/DeliveryForm";
import EmptyCartView from "./components/EmptyCartView";
import LoginPrompt from "./components/LoginPrompt";
import MapModal from "./components/MapModal";
import OrderSummary from "./components/OrderSummary";
import PaymentSelector from "./components/PaymentSelector";
import { BASE_URL } from "@/core/api/api";
import type { AxiosError } from "axios";

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Stores Globales
  const { items, getTotalPrice, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();

  // Hooks Personalizados
  const { isScriptLoaded, scriptError } = useNiubizScript();
  const createOrderMutation = useCreateOrderMutation();
  const { isPending: isCreatingOrder } = createOrderMutation;

  // --- ESTADOS DEL FORMULARIO ---
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "yape">(
    "card"
  );

  // Datos de Entrega
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [references, setReferences] = useState("");

  // Datos de Contacto e Identidad
  const [phone, setPhone] = useState("");
  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");

  // Estados de Interfaz
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Cálculos de Totales
  const subtotal = getTotalPrice();
  const deliveryFee = 5.0;
  const total = subtotal + deliveryFee;
  const isLoading = isCreatingOrder || isProcessingPayment;

  // Debug de usuario
  useEffect(() => {
    if (user) {
      console.log("Checkout iniciado por:", user.username);
    }
  }, [user]);

  // --- HANDLERS DEL MAPA ---
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
      toast.error("Por favor selecciona una ubicación en el mapa");
      return;
    }
    setIsMapOpen(false);
  };

  // --- PROCESO PRINCIPAL DE ORDEN ---
  const handleProcessOrder = () => {
    // 1. Validaciones de Campos
    if (!address.trim() || !coordinates) {
      return toast.error("Selecciona tu dirección de entrega en el mapa");
    }
    if (!phone.trim() || phone.length < 9) {
      return toast.error("Ingresa un teléfono válido de 9 dígitos");
    }
    if (!docNumber.trim()) {
      return toast.error("El número de documento es obligatorio");
    }
    if (docType === "DNI" && docNumber.length !== 8) {
      return toast.error("El DNI debe tener 8 dígitos");
    }
    if (docType === "RUC" && docNumber.length !== 11) {
      return toast.error("El RUC debe tener 11 dígitos");
    }

    // 2. Validación de Niubiz (Si es tarjeta)
    if (paymentMethod === "card") {
      if (scriptError) {
        return toast.error(
          "Error cargando la pasarela de pagos. Por favor desactiva AdBlock y recarga."
        );
      }
      if (!isScriptLoaded) {
        return toast.info(
          "Cargando sistema de seguridad de pagos, intenta en unos segundos..."
        );
      }
    }

    // 3. Construir Payload para la Orden
    const orderPayload: OrderRequest = {
      customerId: user?.id || null,
      statusId: 1, // PENDING
      typeId: 3, // DELIVERY
      details: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      deliveryAddress: {
        street: address,
        reference: references,
        city: "Ica",
        province: "Ica",
        zipCode: "11000",
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        instructions: items[0]?.notes || "",
      },
      // Si es tarjeta, NO enviamos el pago en la creación (se hace en el flujo de Niubiz después)
      payments:
        paymentMethod !== "card"
          ? [
              {
                paymentMethodId: paymentMethod === "cash" ? 1 : 3,
                amount: total,
                isOnline: false,
                status: "PENDING",
              },
            ]
          : [],
    };

    // 4. Ejecutar Mutación de Creación de Orden
    createOrderMutation.mutate(
      { data: orderPayload, lang: "es" },
      {
        onSuccess: (response) => {
          const orderId = response.data.id;

          if (paymentMethod === "card") {
            startNiubizFlow(orderId);
          } else {
            finishSuccess();
          }
        },
        onError: (error) => {
          console.error(error);
          const axiosError = error as AxiosError<{ message: string }>;

          toast.error(
            axiosError.response?.data?.message || "Error al crear la orden"
          );
        },
      }
    );
  };

  const startNiubizFlow = async (orderId: number) => {
    setIsProcessingPayment(true);
    try {
      const response = await paymentService.startNiubizPayment({
        orderId,
        amount: total,
      });

      const { sessionKey, merchantId, purchaseNumber } = response.data;

      // --- CORRECCIÓN 1: Guardar ANTES de abrir el modal ---
      // Usamos el MISMO nombre que en PaymentValidate: "pending_payment_metadata"
      const paymentMetadata = {
        purchaseNumber: purchaseNumber,
        amount: total,
      };
      localStorage.setItem(
        "pending_payment_metadata",
        JSON.stringify(paymentMetadata)
      );
      // -----------------------------------------------------

      const config = {
        sessiontoken: sessionKey,
        channel: "web",
        merchantid: merchantId,
        purchasenumber: purchaseNumber,
        amount: Number(total.toFixed(2)),
        expirationminutes: "5",
        timeouturl: window.location.origin + "/menu",
        merchantlogo:
          "https://static-content.vnforapps.com/v2/img/logo-comercio-demo.png",
        merchantname: "Central Restaurante",

        // Apunta a tu Backend Java
        action: `${BASE_URL.replace(/\/$/, "")}/payments/niubiz/callback`,

        // Ya NO necesitamos el complete para guardar, el backend redirige
        complete: () => {
          console.log("Esperando redirección del backend...");
        },
      };

      if (window.VisanetCheckout) {
        window.VisanetCheckout.configure(config);
        window.VisanetCheckout.open();
        // NO quitamos el loading (setIsProcessingPayment(false)) aquí,
        // para que el usuario espere la redirección.
      } else {
        console.error("VisanetCheckout no disponible.");
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error("Error iniciando Niubiz:", error);
      toast.error("Error al conectar con el servidor de pagos");
      setIsProcessingPayment(false);
    }
  };


  const finishSuccess = () => {
    setIsProcessingPayment(false);
    clearCart();
    navigate("/payment/success");
  };

  // --- RENDERIZADO ---
  if (items.length === 0) return <EmptyCartView />;

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
          {/* COLUMNA IZQUIERDA: Formularios o Login */}
          <div className="lg:col-span-2 space-y-8">
            {!user ? (
              <LoginPrompt />
            ) : (
              <>
                <DeliveryForm
                  address={address}
                  coordinates={coordinates}
                  references={references}
                  phone={phone}
                  docType={docType}
                  docNumber={docNumber}
                  onOpenMap={() => setIsMapOpen(true)}
                  setReferences={setReferences}
                  setPhone={setPhone}
                  setDocType={setDocType}
                  setDocNumber={setDocNumber}
                />
                <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                />

                {/* Avisos de estado de la pasarela (Solo tarjeta) */}
                {paymentMethod === "card" && (
                  <div className="fade-in transition-opacity duration-500">
                    {!isScriptLoaded && !scriptError && (
                      <p className="text-yellow-500 text-sm mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                        Conectando con servicios de seguridad...
                      </p>
                    )}
                    {scriptError && (
                      <p className="text-red-400 text-sm mt-2 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                        ⚠️ No se pudo cargar el sistema de pagos. Es posible que
                        un bloqueador de anuncios (AdBlock) esté interfiriendo.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* COLUMNA DERECHA: Resumen */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              isLoading={isLoading}
              isUserLoggedIn={!!user}
              onRemoveItem={removeItem}
              onProcessOrder={handleProcessOrder}
            />
          </div>
        </div>
      </div>

      {/* Modal Flotante del Mapa */}
      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onConfirm={handleConfirmMap}
        onLocationSelect={handleLocationSelect}
        initialLat={coordinates?.lat}
        initialLng={coordinates?.lng}
      />
    </section>
  );
}
