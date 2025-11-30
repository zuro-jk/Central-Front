import LocationPicker from "@/components/Maps/LocationPicker";
import { MapPin, X } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onLocationSelect: (address: string, lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function MapModal({
  isOpen,
  onClose,
  onConfirm,
  onLocationSelect,
  initialLat,
  initialLng,
}: MapModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-neutral-900 w-full max-w-2xl rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden flex flex-col transform transition-transform scale-100">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <MapPin className="text-red-500" /> Selecciona tu ubicación
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 bg-neutral-900">
          <LocationPicker
            onLocationSelect={onLocationSelect}
            initialLat={initialLat}
            initialLng={initialLng}
          />
        </div>

        <div className="p-4 border-t border-neutral-800 flex justify-end gap-3 bg-neutral-900">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-neutral-800 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/30"
          >
            Confirmar Ubicación
          </button>
        </div>
      </div>
    </div>
  );
}
