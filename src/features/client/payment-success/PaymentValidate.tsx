import { paymentService } from "@/core/services/payment/payment.service";
import { useCartStore } from "@/core/stores/cart/cart.store";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { toast } from "react-toastify";

export default function PaymentValidate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCartStore();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const validatePayment = async () => {
      const tokenFromUrl = searchParams.get("token");

      const metadataString = localStorage.getItem("pending_payment_metadata");

      if (!tokenFromUrl || !metadataString) {
        toast.error("Datos de pago incompletos. Contacta a soporte.");
        navigate("/checkout");
        return;
      }

      const metadata = JSON.parse(metadataString);

      try {
        await paymentService.confirmNiubizPayment({
          transactionToken: tokenFromUrl,
          purchaseNumber: metadata.purchaseNumber,
          amount: metadata.amount,
        });

        localStorage.removeItem("pending_payment_metadata");
        clearCart();
        navigate("/payment/success");
      } catch (error) {
        console.error("Error validando pago:", error);
        toast.error("Hubo un problema confirmando tu pago con el banco.");
        navigate("/checkout");
      }
    };

    validatePayment();
  }, [navigate, clearCart, searchParams]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      <h2 className="text-xl font-semibold">Validando transacción...</h2>
      <p className="text-gray-400">Estamos confirmando tu pago con el banco.</p>
    </div>
  );
}
