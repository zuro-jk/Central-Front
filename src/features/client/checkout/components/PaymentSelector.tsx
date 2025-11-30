import { Banknote, CreditCard, Smartphone } from "lucide-react";

type PaymentMethodType = "card" | "cash" | "yape";

interface PaymentSelectorProps {
  selectedMethod: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
}

export default function PaymentSelector({
  selectedMethod,
  onSelect,
}: PaymentSelectorProps) {
  return (
    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 shadow-lg">
      <div className="flex items-center gap-3 mb-6 border-b border-neutral-700 pb-4">
        <CreditCard className="text-red-500" />
        <h2 className="text-xl font-bold">Método de Pago</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div
          onClick={() => onSelect("card")}
          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all transform hover:scale-[1.02] ${
            selectedMethod === "card"
              ? "bg-red-600/10 border-red-600 text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.2)]"
              : "bg-neutral-900 border-neutral-600 hover:border-gray-400 text-gray-400"
          }`}
        >
          <CreditCard size={32} />
          <span className="font-bold text-sm">Tarjeta Online</span>
        </div>

        <div
          onClick={() => onSelect("yape")}
          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all transform hover:scale-[1.02] ${
            selectedMethod === "yape"
              ? "bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              : "bg-neutral-900 border-neutral-600 hover:border-gray-400 text-gray-400"
          }`}
        >
          <Smartphone size={32} />
          <span className="font-bold text-sm">Yape / Plin</span>
        </div>

        <div
          onClick={() => onSelect("cash")}
          className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition-all transform hover:scale-[1.02] ${
            selectedMethod === "cash"
              ? "bg-green-600/10 border-green-500 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
              : "bg-neutral-900 border-neutral-600 hover:border-gray-400 text-gray-400"
          }`}
        >
          <Banknote size={32} />
          <span className="font-bold text-sm">Contraentrega</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-neutral-900/80 border border-neutral-700 rounded-xl text-sm text-gray-400 flex items-start gap-3">
        <div className="mt-1 text-red-500">
          <div className="w-2 h-2 bg-current rounded-full" />
        </div>
        <p>
          {selectedMethod === "card" &&
            "Serás redirigido a la pasarela segura de Niubiz para completar tu compra."}
          {selectedMethod === "yape" &&
            "El repartidor te mostrará el código QR al momento de la entrega."}
          {selectedMethod === "cash" &&
            "Pagas en efectivo al recibir. Por favor ten el monto exacto si es posible."}
        </p>
      </div>
    </div>
  );
}
