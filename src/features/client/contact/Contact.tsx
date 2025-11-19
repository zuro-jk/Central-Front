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
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#363333] via-[#222] to-[#1a1a1a] min-h-screen">

      <h2 className="text-5xl font-bold text-center text-white mb-16 drop-shadow-lg">
        Contáctanos
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#2b2b2b] rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-700"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre"
            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-600 focus:ring-2 focus:ring-red-600"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Correo electrónico"
            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-600 focus:ring-2 focus:ring-red-600"
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Asunto"
            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-600 focus:ring-2 focus:ring-red-600"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Mensaje"
            rows={5}
            className="p-3 rounded-lg bg-[#1f1f1f] text-white border border-gray-600 focus:ring-2 focus:ring-red-600 resize-none"
          />

          <button
            type="submit"
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Enviar mensaje
          </button>

          {submitted && (
            <p className="text-green-500 font-semibold text-center mt-2">
              ¡Gracias! Tu mensaje ha sido enviado.
            </p>
          )}
        </form>

        {/* Información */}
        <div className="flex flex-col justify-center gap-6 text-gray-200 text-lg">

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl">📍</span>
            <p>Av. Principal 123, Lima – Perú</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl">📞</span>
            <p>+51 987 654 321</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl">✉️</span>
            <p>contacto@restaurante.com</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl">⏰</span>
            <p>Lunes a Domingo: 12:00pm – 11:00pm</p>
          </div>

          <div className="flex justify-start gap-6 mt-8 text-4xl">
            <a
              href="https://wa.me/51987654321"
              target="_blank"
              className="text-green-500 hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-blue-500 hover:scale-110 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="text-pink-500 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
          Preguntas Frecuentes
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            "¿Hacen envíos a domicilio?",
            "¿Cuál es el horario de atención?",
            "¿Aceptan pagos con tarjeta?",
            "¿Es necesario reservar con anticipación?",
            "¿Ofrecen opciones vegetarianas o veganas?",
          ].map((q, i) => (
            <details
              key={i}
              className="p-6 bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-md hover:border-red-600 transition"
            >
              <summary className="cursor-pointer font-semibold text-lg text-white">
                {q}
              </summary>
              <p className="mt-3 text-gray-300">
                Información correspondiente a esta pregunta.
              </p>
            </details>
          ))}
        </div>
      </section>

    </section>
  );
}

export default Contact;
