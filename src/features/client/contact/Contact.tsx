import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a tu backend
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-red-50 to-amber-50 min-h-screen">
      <h2 className="text-5xl font-bold text-center text-red-700 mb-12">
        Contáctanos
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Correo electrónico"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Asunto"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Mensaje"
            rows={5}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Enviar mensaje
          </button>
          {submitted && (
            <p className="text-green-600 font-semibold text-center mt-2">
              ¡Gracias! Tu mensaje ha sido enviado.
            </p>
          )}
        </form>

        {/* Información de contacto */}
        <div className="flex flex-col justify-center gap-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3">
            <span className="text-red-600 text-2xl">📍</span>
            <p>Av. Principal 123, Lima – Perú</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-red-600 text-2xl">📞</span>
            <p>+51 987 654 321</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-red-600 text-2xl">✉️</span>
            <p>contacto@restaurante.com</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-red-600 text-2xl">⏰</span>
            <p>Lunes a Domingo: 12:00pm – 11:00pm</p>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <div className="flex justify-center gap-6 mt-6">
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/51987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-4xl hover:scale-110 transition-transform"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://www.facebook.com/tuPagina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-4xl hover:scale-110 transition-transform"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/tuPerfil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-4xl hover:scale-110 transition-transform"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preguntas frecuentes */}
      <section className="py-20 px-6 ">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-12">
          Preguntas Frecuentes
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <details className="p-6 border rounded-xl shadow-sm">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800">
              ¿Hacen envíos a domicilio?
            </summary>
            <p className="mt-3 text-gray-600">
              Sí, realizamos envíos a toda Lima Metropolitana con un costo
              adicional según la zona.
            </p>
          </details>

          <details className="p-6 border rounded-xl shadow-sm">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800">
              ¿Cuál es el horario de atención?
            </summary>
            <p className="mt-3 text-gray-600">
              Nuestro horario es de lunes a domingo, desde las 12:00 pm hasta
              las 11:00 pm.
            </p>
          </details>

          <details className="p-6 border rounded-xl shadow-sm">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800">
              ¿Aceptan pagos con tarjeta?
            </summary>
            <p className="mt-3 text-gray-600">
              Sí, aceptamos todas las tarjetas de débito y crédito, además de
              pagos por Yape y Plin.
            </p>
          </details>

          <details className="p-6 border rounded-xl shadow-sm">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800">
              ¿Es necesario reservar con anticipación?
            </summary>
            <p className="mt-3 text-gray-600">
              No es obligatorio, pero recomendamos reservar en fines de semana y
              feriados para asegurar tu mesa.
            </p>
          </details>

          <details className="p-6 border rounded-xl shadow-sm">
            <summary className="cursor-pointer font-semibold text-lg text-gray-800">
              ¿Ofrecen opciones vegetarianas o veganas?
            </summary>
            <p className="mt-3 text-gray-600">
              Sí, contamos con una variedad de platos vegetarianos y veganos en
              nuestro menú.
            </p>
          </details>
        </div>
      </section>
    </section>
  );
}

export default Contact;
