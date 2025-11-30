import { Map, MapPin, User } from "lucide-react";

interface DeliveryFormProps {
  address: string;
  coordinates: { lat: number; lng: number } | null;
  references: string;
  phone: string;
  docType: string;
  docNumber: string;
  onOpenMap: () => void;
  setReferences: (value: string) => void;
  setPhone: (value: string) => void;
  setDocType: (value: string) => void;
  setDocNumber: (value: string) => void;
}

export default function DeliveryForm({
  address,
  coordinates,
  references,
  phone,
  docType,
  docNumber,
  onOpenMap,
  setReferences,
  setPhone,
  setDocType,
  setDocNumber,
}: DeliveryFormProps) {
  return (
    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 shadow-lg space-y-6 animate-fade-in-up">
      {/* SECCIÓN 1: UBICACIÓN */}
      <div>
        <div className="flex items-center gap-3 mb-4 border-b border-neutral-700 pb-2">
          <MapPin className="text-red-500" />
          <h2 className="text-lg font-bold text-white">Ubicación de Entrega</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Dirección exacta
            </label>
            <div className="flex gap-3">
              <div className="flex-1 bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white flex items-center justify-between min-h-[50px]">
                <span
                  className={
                    address ? "text-white line-clamp-1" : "text-gray-500 italic"
                  }
                >
                  {address || "Selecciona tu ubicación en el mapa..."}
                </span>
                {coordinates && (
                  <MapPin
                    size={18}
                    className="text-green-500 shrink-0 ml-2"
                  />
                )}
              </div>
              <button
                onClick={onOpenMap}
                className="bg-neutral-700 hover:bg-neutral-600 text-white p-3 rounded-xl border border-neutral-600 transition-colors flex items-center gap-2 shrink-0"
                title="Abrir mapa"
              >
                <Map size={20} />
                <span className="hidden sm:inline font-medium">Mapa</span>
              </button>
            </div>
            {address && coordinates && (
              <p className="text-xs text-gray-500 mt-2 font-mono">
                GPS: {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Referencia (Opcional)
            </label>
            <input
              type="text"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Ej: Frente al parque, casa azul..."
              className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: DATOS DE CONTACTO */}
      <div>
        <div className="flex items-center gap-3 mb-4 border-b border-neutral-700 pb-2">
          <User className="text-red-500" />
          <h2 className="text-lg font-bold text-white">
            Datos de quien recibe
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Tipo Doc.
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="DNI">DNI</option>
              <option value="CE">Carnet Ext.</option>
              <option value="RUC">RUC</option>
              <option value="PASSPORT">Pasaporte</option>
            </select>
          </div>

          {/* Número de Documento */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Nro. Documento
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => {
                const val = e.target.value;
                // Validación simple: solo números para DNI/RUC
                if (
                  (docType === "DNI" || docType === "RUC") &&
                  !/^\d*$/.test(val)
                )
                  return;
                setDocNumber(val);
              }}
              maxLength={docType === "DNI" ? 8 : docType === "RUC" ? 11 : 15}
              placeholder={
                docType === "DNI" ? "8 dígitos" : "Número de documento"
              }
              className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder-gray-600"
            />
          </div>

          {/* Teléfono */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Teléfono de contacto
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const val = e.target.value;
                if (!/^\d*$/.test(val)) return;
                setPhone(val);
              }}
              maxLength={9}
              placeholder="999 999 999"
              className="w-full bg-neutral-900 border border-neutral-600 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-600 focus:outline-none transition-all placeholder-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
