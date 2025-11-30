import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Loader2, MapPin } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

const defaultCenter = {
  lat: -14.0639,
  lng: -75.729,
};

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

interface LocationPickerProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}

export default function LocationPicker({
  onLocationSelect,
  initialLat,
  initialLng,
}: LocationPickerProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [position, setPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    if (initialLat && initialLng) {
      setPosition({ lat: initialLat, lng: initialLng });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("No se pudo obtener la ubicación, usando default (Ica)");
        }
      );
    }
  }, [initialLat, initialLng]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    setLoadingAddress(true);
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
        onLocationSelect(formattedAddress, lat, lng);
      } else {
        console.error("Geocoder falló: " + status);
        setAddress("Ubicación seleccionada");
        onLocationSelect("Ubicación seleccionada en mapa", lat, lng);
      }
      setLoadingAddress(false);
    });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });
      fetchAddress(lat, lng);
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setPosition({ lat, lng });
      fetchAddress(lat, lng);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-[400px] w-full bg-neutral-800 rounded-xl flex items-center justify-center text-gray-400">
        <Loader2 className="animate-spin mr-2" /> Cargando mapa...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700 flex items-center gap-3">
        <MapPin className="text-red-500 shrink-0" />
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase font-bold">
            Ubicación Seleccionada
          </p>
          {loadingAddress ? (
            <p className="text-sm text-gray-300 animate-pulse">
              Obteniendo dirección...
            </p>
          ) : (
            <p className="text-sm text-white truncate">
              {address || "Arrastra el pin o toca el mapa"}
            </p>
          )}
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
        options={{
          styles: darkMapStyles,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
      >
        <MarkerF
          position={position}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  );
}
