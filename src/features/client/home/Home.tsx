import { useGetFeaturedProductsQuery } from "@/core/hooks/products/useProduct.hooks";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: featuredProducts, isLoading } = useGetFeaturedProductsQuery();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-red-50">
      <section className="relative flex items-center justify-center text-center h-screen overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/inicio/home-fondo.png"
            alt="Fondo Home"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <h1
            className="text-6xl md:text-9xl font-extrabold text-white drop-shadow-2xl mb-4 tracking-tighter"
            style={{ fontFamily: "'Playfair Display', serif" }} // Sugerencia de fuente elegante
          >
            CENTRAL
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light tracking-widest uppercase">
            Restaurante
          </p>

          <div className="absolute left-6 bottom-10 hidden md:block">
            <p className="text-white text-sm bg-black/60 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-white/10">
              Av. Pedro de Osma 301, Barranco
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN INFO --- */}
      <section className="bg-neutral-900 flex justify-center items-center py-20 px-6">
        <div className="max-w-6xl w-full mx-auto bg-neutral-800 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-neutral-700">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src="/images/inicio/central-info.jpg"
              alt="Central Restaurante"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Biodiversidad y Altura
            </h2>
            <h3 className="text-xl font-medium text-red-500 mb-4">
              Un viaje a través de los ecosistemas peruanos
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Central celebra la diversidad del Perú. Exploramos desde el mar
              profundo hasta las alturas de los Andes y la Amazonía. Cada plato
              es un ecosistema, una historia de altura y tradición, conectando
              al comensal con la naturaleza y los productores locales.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PLATOS DESTACADOS (DINÁMICA) --- */}
      <section className="py-24 px-6 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Nuestros Favoritos
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Los platos mejor calificados por nuestros comensales, una selección
            de sabores inigualables.
          </p>

          {isLoading ? (
            // Skeleton Loading simple
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-neutral-800 rounded-2xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featuredProducts?.data?.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="group bg-neutral-800 rounded-2xl shadow-lg overflow-hidden border border-neutral-700 hover:border-red-600/50 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.imageUrl || "/images/placeholder-dish.jpg"} // Imagen fallback
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/400x300?text=Sin+Imagen";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                        {product.name}
                      </h3>
                      {product.categoryName && (
                        <span className="text-xs font-semibold bg-red-600 text-white px-2 py-1 rounded">
                          {product.categoryName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                      {product.description ||
                        "Una experiencia culinaria única del chef."}
                    </p>
                    <div className="flex justify-between items-center border-t border-neutral-700 pt-4">
                      <span className="text-xl font-bold text-amber-500">
                        S/ {product.price.toFixed(2)}
                      </span>
                      <Link
                        to="/menu"
                        className="text-sm text-white hover:text-red-500 font-semibold transition-colors"
                      >
                        Ver carta &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Mensaje si no hay productos */}
              {(!featuredProducts || featuredProducts.data.length === 0) && (
                <div className="col-span-3 text-center text-gray-500 py-10">
                  No hay platos destacados disponibles en este momento.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- SECCIÓN SOBRE NOSOTROS --- */}
      <section className="py-28 px-10 text-center bg-neutral-900 border-t border-neutral-800">
        <h2 className="text-4xl font-bold text-white mb-8">Filosofía</h2>
        <p className="max-w-4xl mx-auto text-xl text-gray-300 leading-relaxed font-light">
          "En Central, cocinamos ecosistemas. No se trata solo de ingredientes,
          sino de paisajes, altitudes y tradiciones. Queremos que entiendas el
          entorno peruano a través de cada bocado, respetando la temporalidad y
          la investigación constante."
        </p>
      </section>

      {/* --- SECCIÓN ENCUÉNTRANOS (ACTUALIZADA) --- */}
      <section className="py-24 px-6 bg-neutral-900 relative border-t border-neutral-800">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Visítanos
        </h2>
        <div className="max-w-6xl mx-auto bg-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Info Contacto */}
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="flex items-center text-xl font-bold text-white mb-2">
                <span className="text-red-600 mr-3 text-2xl">📍</span> Ubicación
              </h3>
              <p className="text-gray-400 ml-9">
                Av. Pedro de Osma 301
                <br />
                Barranco 15063, Lima - Perú
              </p>
            </div>

            <div className="mb-8">
              <h3 className="flex items-center text-xl font-bold text-white mb-2">
                <span className="text-red-600 mr-3 text-2xl">🕒</span> Horarios
              </h3>
              <p className="text-gray-400 ml-9">
                <span className="block mb-1">
                  <strong className="text-gray-300">Almuerzo:</strong> Lun-Sáb
                  12:45pm - 1:45pm
                </span>
                <span className="block">
                  <strong className="text-gray-300">Cena:</strong> Lun-Sáb
                  7:00pm - 8:30pm
                </span>
                <span className="text-sm text-gray-500 mt-2 block">
                  (Domingos cerrado)
                </span>
              </p>
            </div>

            <div>
              <h3 className="flex items-center text-xl font-bold text-white mb-2">
                <span className="text-red-600 mr-3 text-2xl">📞</span> Contacto
              </h3>
              <p className="text-gray-400 ml-9">
                (01) 242-8515
                <br />
                reservas@centralrestaurante.com.pe
              </p>
            </div>
          </div>

          <div className="flex-1 h-96 md:h-auto bg-neutral-700">
            <iframe
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              title="Mapa Central Restaurante"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.8647007669666!2d-77.0246465846187!3d-12.152648291397858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b7e1872d5bd3%3A0x5f5d8fa5bbdab11c!2sCentral%20Restaurante!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
